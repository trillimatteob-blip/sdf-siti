/**
 * Orchestrator — runs a linear pipeline of Claude agents end-to-end.
 *
 * Usage:
 *   npx ts-node orchestrator/index.ts "your product idea here"
 *
 * Each agent's `systemPrompt` lives in `./agents/<name>.ts`. The first agent
 * receives the raw idea as its user message. Every subsequent agent receives
 * the previous agent's JSON output (stringified) as its user message, plus a
 * reminder of the original idea. Results are written to
 * `./outputs/<agent-name>.json`.
 *
 * Model / thinking / streaming defaults follow the claude-api skill guidance:
 *   - claude-opus-4-6 (never downgrade silently)
 *   - adaptive thinking (no budget_tokens — that parameter is deprecated on 4.6)
 *   - streaming via .stream() + .finalMessage() so large outputs don't hit
 *     HTTP timeouts
 *   - cache_control on the system prompt so repeated runs within the cache
 *     TTL reuse the prefix (once the prompts are filled in and large enough
 *     to meet the minimum cacheable size).
 */

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "node:fs/promises";
import * as path from "node:path";

import { systemPrompt as marketResearcherPrompt } from "./agents/market-researcher";
import { systemPrompt as specWriterPrompt } from "./agents/spec-writer";
import { systemPrompt as dbArchitectPrompt } from "./agents/db-architect";
import { systemPrompt as codeGeneratorPrompt } from "./agents/code-generator";
import { systemPrompt as codeReviewerPrompt } from "./agents/code-reviewer";
import { systemPrompt as fixAgentPrompt } from "./agents/fix-agent";
import { systemPrompt as deployAgentPrompt } from "./agents/deploy-agent";

const MODEL = "claude-opus-4-6";
const MAX_TOKENS = 64_000;

interface AgentConfig {
  name: string;
  systemPrompt: string;
  /**
   * Names of previously-run agents whose cached outputs should also be
   * included in this agent's user message, beyond the immediate predecessor.
   * The orchestrator reads the listed `outputs/<name>.json` files from disk
   * and appends their `output` field as additional context.
   *
   * Used by fix-agent, which needs both code-reviewer (its immediate
   * predecessor, with the list of issues) and code-generator (the original
   * files to patch).
   */
  extraInputs?: readonly string[];
}

const PIPELINE: readonly AgentConfig[] = [
  { name: "market-researcher", systemPrompt: marketResearcherPrompt },
  { name: "spec-writer", systemPrompt: specWriterPrompt },
  { name: "db-architect", systemPrompt: dbArchitectPrompt },
  { name: "code-generator", systemPrompt: codeGeneratorPrompt },
  { name: "code-reviewer", systemPrompt: codeReviewerPrompt },
  {
    name: "fix-agent",
    systemPrompt: fixAgentPrompt,
    extraInputs: ["code-generator"],
  },
  { name: "deploy-agent", systemPrompt: deployAgentPrompt },
];

interface AgentRecord {
  agent: string;
  idea: string;
  userMessage: string;
  output: unknown;
  rawText: string;
  stopReason: Anthropic.Message["stop_reason"];
  usage: {
    inputTokens: number;
    outputTokens: number;
    cacheCreationInputTokens: number | null;
    cacheReadInputTokens: number | null;
  };
  completedAt: string;
  durationMs: number;
}

/**
 * Build the `system` field for a Claude request. Returns `undefined` when the
 * agent's prompt is empty (passing an empty string would be rejected), or a
 * single-element array with `cache_control` when the prompt is non-empty so
 * the skill's prompt-caching guidance applies.
 */
function buildSystem(
  prompt: string,
): Anthropic.TextBlockParam[] | undefined {
  if (!prompt.trim()) return undefined;
  return [
    {
      type: "text",
      text: prompt,
      cache_control: { type: "ephemeral" },
    },
  ];
}

/**
 * Run one agent. Streams the response and returns the final assembled
 * `Message` so the caller can inspect `stop_reason` and usage.
 */
async function runAgent(
  client: Anthropic,
  agent: AgentConfig,
  userMessage: string,
): Promise<Anthropic.Message> {
  const system = buildSystem(agent.systemPrompt);

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userMessage },
  ];

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    thinking: { type: "adaptive" },
    ...(system ? { system } : {}),
    messages,
  });

  return stream.finalMessage();
}

/**
 * Flatten a Claude response into plain text. Thinking blocks are excluded —
 * the pipeline only passes the model's user-facing output downstream.
 */
function extractText(message: Anthropic.Message): string {
  return message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}

/**
 * Best-effort JSON extraction. Agents *should* return strict JSON, but until
 * the system prompts are written they'll return prose — in that case we fall
 * back to the raw string. Also handles ```json fenced blocks.
 */
function tryParseJson(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed) return null;

  try {
    return JSON.parse(trimmed);
  } catch {
    // fall through
  }

  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch && fenceMatch[1]) {
    try {
      return JSON.parse(fenceMatch[1]);
    } catch {
      // fall through
    }
  }

  return null;
}

/**
 * Read a previously-written agent output file, if it exists. Returns `null`
 * on any read/parse failure — a corrupt cache file should not wedge the
 * pipeline; we'll just rerun the agent.
 */
async function readCachedOutput(
  outputPath: string,
): Promise<AgentRecord | null> {
  try {
    const raw = await fs.readFile(outputPath, "utf8");
    const parsed = JSON.parse(raw) as AgentRecord;
    if (typeof parsed !== "object" || parsed === null) return null;
    return parsed;
  } catch {
    return null;
  }
}

interface ExtraInput {
  agent: string;
  output: unknown;
}

/**
 * Stringify an agent output for inclusion in the next agent's user message.
 * JSON objects are pretty-printed; raw strings are passed through.
 */
function serializeOutput(output: unknown): string {
  return typeof output === "string"
    ? output
    : JSON.stringify(output, null, 2);
}

/**
 * Serialize previous output for the next agent's user message. If the
 * previous agent returned parseable JSON we pretty-print it so the next agent
 * sees a structured input; otherwise we pass the raw text. Any `extras`
 * (cached outputs from non-adjacent predecessors) are appended as clearly
 * labelled additional context blocks.
 */
function buildUserMessage(
  idea: string,
  previousAgent: string | null,
  previousOutput: unknown,
  extras: readonly ExtraInput[] = [],
): string {
  if (previousAgent === null || previousOutput === null) {
    // First agent in the pipeline — no upstream context.
    if (extras.length === 0) {
      return `Product idea:\n${idea}`;
    }
    const parts: string[] = [`Original product idea:\n${idea}`];
    for (const extra of extras) {
      parts.push(
        "",
        `Additional context — ${extra.agent} output:`,
        serializeOutput(extra.output),
      );
    }
    return parts.join("\n");
  }

  const parts: string[] = [
    `Original product idea:\n${idea}`,
    "",
    `Previous agent (${previousAgent}) output:`,
    serializeOutput(previousOutput),
  ];

  for (const extra of extras) {
    parts.push(
      "",
      `Additional context — ${extra.agent} output:`,
      serializeOutput(extra.output),
    );
  }

  return parts.join("\n");
}

async function main(): Promise<void> {
  const idea = process.argv.slice(2).join(" ").trim();
  if (!idea) {
    console.error(
      'Usage: npx ts-node orchestrator/index.ts "your product idea"',
    );
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error(
      "ANTHROPIC_API_KEY is not set. Export it before running the orchestrator.",
    );
    process.exit(1);
  }

  const outputsDir = path.resolve(process.cwd(), "orchestrator", "outputs");
  await fs.mkdir(outputsDir, { recursive: true });

  const client = new Anthropic();

  console.log("Orchestrator pipeline starting");
  console.log(`  model: ${MODEL}`);
  console.log(`  agents: ${PIPELINE.map((a) => a.name).join(" -> ")}`);
  console.log(`  idea: ${idea}`);
  console.log("");

  let previousAgent: string | null = null;
  let previousOutput: unknown = null;

  for (const [index, agent] of PIPELINE.entries()) {
    const step = `[${index + 1}/${PIPELINE.length}]`;
    const outputPath = path.join(outputsDir, `${agent.name}.json`);

    // Resume support: if a previous run already produced this agent's output,
    // skip the API call and feed the cached result forward. Delete the file
    // (or pass --fresh, not implemented) to force a re-run.
    const cached = await readCachedOutput(outputPath);
    if (cached) {
      console.log(
        `${step} ${agent.name} - cached (skipping API call) -> orchestrator/outputs/${agent.name}.json`,
      );
      previousAgent = agent.name;
      previousOutput = cached.output;
      continue;
    }

    // Load any declared extra inputs from disk. These are cached outputs of
    // earlier-but-non-adjacent agents (e.g. fix-agent needs both code-reviewer
    // — its immediate predecessor — and code-generator — the files to patch).
    const extras: ExtraInput[] = [];
    if (agent.extraInputs && agent.extraInputs.length > 0) {
      for (const extraName of agent.extraInputs) {
        const extraPath = path.join(outputsDir, `${extraName}.json`);
        const extraCached = await readCachedOutput(extraPath);
        if (!extraCached) {
          console.error(
            `${step} ${agent.name} - missing required extra input '${extraName}' ` +
              `(expected orchestrator/outputs/${extraName}.json). ` +
              `Run the pipeline from the beginning or produce that file first.`,
          );
          process.exit(1);
        }
        extras.push({ agent: extraName, output: extraCached.output });
      }
    }

    const userMessage = buildUserMessage(
      idea,
      previousAgent,
      previousOutput,
      extras,
    );

    console.log(`${step} ${agent.name} - running`);
    const started = Date.now();

    let message: Anthropic.Message;
    try {
      message = await runAgent(client, agent, userMessage);
    } catch (err) {
      if (err instanceof Anthropic.APIError) {
        console.error(
          `${step} ${agent.name} - API error ${err.status}: ${err.message}`,
        );
      } else {
        const detail = err instanceof Error ? err.message : String(err);
        console.error(`${step} ${agent.name} - error: ${detail}`);
      }
      process.exit(1);
    }

    const rawText = extractText(message);
    const parsed = tryParseJson(rawText);
    const output: unknown = parsed ?? rawText;

    const durationMs = Date.now() - started;
    const record: AgentRecord = {
      agent: agent.name,
      idea,
      userMessage,
      output,
      rawText,
      stopReason: message.stop_reason,
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
        cacheCreationInputTokens:
          message.usage.cache_creation_input_tokens ?? null,
        cacheReadInputTokens: message.usage.cache_read_input_tokens ?? null,
      },
      completedAt: new Date().toISOString(),
      durationMs,
    };

    await fs.writeFile(
      outputPath,
      `${JSON.stringify(record, null, 2)}\n`,
      "utf8",
    );

    const seconds = (durationMs / 1000).toFixed(1);
    console.log(
      `${step} ${agent.name} - done in ${seconds}s ` +
        `(in ${record.usage.inputTokens}, ` +
        `out ${record.usage.outputTokens}, ` +
        `cache r/w ${record.usage.cacheReadInputTokens ?? 0}/` +
        `${record.usage.cacheCreationInputTokens ?? 0}) ` +
        `-> orchestrator/outputs/${agent.name}.json`,
    );

    previousAgent = agent.name;
    previousOutput = output;
  }

  console.log("");
  console.log("Pipeline complete. Outputs saved to orchestrator/outputs/");
}

main().catch((err) => {
  console.error("Pipeline failed:", err);
  process.exit(1);
});
