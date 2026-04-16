#!/bin/bash
set -euo pipefail

# Colors
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
log() { echo -e "${BLUE}[$(date +%H:%M:%S)]${NC} $1"; }
success() { echo -e "${GREEN}✓${NC} $1"; }
error() { echo -e "${RED}✗${NC} $1"; exit 1; }

# Load env
[ -f .env ] && export $(cat .env | grep -v '#' | xargs)

# Check prerequisites
check_prereqs() {
  log "Checking prerequisites..."
  command -v gh >/dev/null || error "gh CLI not installed"
  command -v vercel >/dev/null || error "vercel CLI not installed"
  command -v supabase >/dev/null || error "supabase CLI not installed"
  command -v python3 >/dev/null || error "python3 not installed"
  [ -n "${ANTHROPIC_API_KEY:-}" ] || error "ANTHROPIC_API_KEY missing in .env"
  [ -n "${SUPABASE_MANAGEMENT_API_TOKEN:-}" ] || error "SUPABASE_MANAGEMENT_API_TOKEN missing in .env"
  success "All prerequisites met"
}

PROJECT_NAME=${1:-}
IDEA=${2:-}
[ -z "$PROJECT_NAME" ] && error "Usage: ./scripts/new-project.sh 'project-name' 'idea'"
[ -z "$IDEA" ] && error "Usage: ./scripts/new-project.sh 'project-name' 'idea'"

create_github_repo() {
  log "Creating GitHub repo: $PROJECT_NAME..."
  gh repo create "$PROJECT_NAME" --private --clone
  cd "$PROJECT_NAME"
  git remote add template https://github.com/trillimatteob-blip/sdf-siti.git
  git fetch template claude/saas-starter-template-ZELcw
  git checkout -b main template/claude/saas-starter-template-ZELcw
  git remote remove template
  git push origin main
  success "GitHub repo created: https://github.com/$(gh api user -q .login)/$PROJECT_NAME"
}

create_supabase_project() {
  log "Creating Supabase project..."
  SUPABASE_ORG_ID=$(curl -s https://api.supabase.com/v1/organizations \
    -H "Authorization: Bearer $SUPABASE_MANAGEMENT_API_TOKEN" | \
    python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")

  DB_PASSWORD=$(openssl rand -base64 16)

  RESPONSE=$(curl -s -X POST https://api.supabase.com/v1/projects \
    -H "Authorization: Bearer $SUPABASE_MANAGEMENT_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$PROJECT_NAME\",\"organization_id\":\"$SUPABASE_ORG_ID\",\"plan\":\"free\",\"region\":\"eu-central-1\",\"db_pass\":\"$DB_PASSWORD\"}")

  PROJECT_REF=$(echo $RESPONSE | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

  log "Waiting for Supabase to be ready..."
  for i in {1..30}; do
    STATUS=$(curl -s https://api.supabase.com/v1/projects/$PROJECT_REF \
      -H "Authorization: Bearer $SUPABASE_MANAGEMENT_API_TOKEN" | \
      python3 -c "import sys,json; print(json.load(sys.stdin).get('status',''))")
    [ "$STATUS" = "ACTIVE_HEALTHY" ] && break
    sleep 10
  done

  SUPABASE_URL="https://$PROJECT_REF.supabase.co"
  SUPABASE_ANON_KEY=$(curl -s https://api.supabase.com/v1/projects/$PROJECT_REF/api-keys \
    -H "Authorization: Bearer $SUPABASE_MANAGEMENT_API_TOKEN" | \
    python3 -c "import sys,json; [print(k['api_key']) for k in json.load(sys.stdin) if k['name']=='anon']")

  echo "NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL" >> .env.local
  echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY" >> .env.local

  supabase link --project-ref "$PROJECT_REF" --password "$DB_PASSWORD"
  supabase db push
  success "Supabase ready: $SUPABASE_URL"
}

create_vercel_project() {
  log "Deploying to Vercel..."
  vercel --yes --name "$PROJECT_NAME"
  vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< "$SUPABASE_URL"
  vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<< "$SUPABASE_ANON_KEY"
  vercel env add NEXT_PUBLIC_APP_URL production <<< "https://$PROJECT_NAME.vercel.app"
  VERCEL_URL=$(vercel --prod --yes 2>&1 | grep "Production:" | awk '{print $2}')
  success "Live: $VERCEL_URL"
}

run_agent_pipeline() {
  log "Running agent pipeline..."
  npx ts-node orchestrator/index.ts "$IDEA"
  success "Pipeline complete"
}

apply_generated_code() {
  log "Applying generated code to repo..."
  python3 <<'PYEOF'
import json
import pathlib

with open("orchestrator/outputs/fix-agent.json") as f:
    data = json.load(f)

files = data.get("output", {}).get("corrected_files", [])
if not files:
    raise SystemExit("fix-agent.json has no corrected_files to apply")

for entry in files:
    path = entry.get("path")
    content = entry.get("content", "")
    if not path:
        continue
    p = pathlib.Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content)
    print(f"  wrote {path}")
PYEOF
  git add -A
  git commit -m "chore: apply generated code"
  git push origin main
  success "Generated code pushed to main"
}

print_summary() {
  echo ""
  echo -e "${GREEN}================================${NC}"
  echo -e "${GREEN}  PROJECT READY: $PROJECT_NAME${NC}"
  echo -e "${GREEN}================================${NC}"
  echo "GitHub:   https://github.com/$(gh api user -q .login)/$PROJECT_NAME"
  echo "Vercel:   $VERCEL_URL"
  echo "Supabase: $SUPABASE_URL"
  echo ""
  mkdir -p scripts/outputs
  echo "Project: $PROJECT_NAME
Idea: $IDEA
GitHub: https://github.com/$(gh api user -q .login)/$PROJECT_NAME
Vercel: $VERCEL_URL
Supabase: $SUPABASE_URL
Created: $(date)" > scripts/outputs/$PROJECT_NAME-summary.txt
  success "Summary saved to scripts/outputs/$PROJECT_NAME-summary.txt"
}

check_prereqs
create_github_repo
create_supabase_project
create_vercel_project
run_agent_pipeline
apply_generated_code
print_summary
