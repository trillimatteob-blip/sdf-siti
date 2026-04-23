# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:22-slim AS builder

# Install build deps for native modules (better-sqlite3)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source
COPY . .

# Build Next.js standalone output
RUN npm run build

# ---- Runtime stage ----
FROM node:22-slim AS runner

WORKDIR /app

# Create data directory for SQLite (will be mounted as volume)
RUN mkdir -p /app/data

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy node_modules (needed for native deps like better-sqlite3)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["node", "server.js"]
