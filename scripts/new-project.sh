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
  [ -n "${ANTHROPIC_API_KEY:-}" ] || error "ANTHROPIC_API_KEY missing in .env"
  success "All prerequisites met"
}

PROJECT_NAME=${1:-}
IDEA=${2:-}
[ -z "$PROJECT_NAME" ] && error "Usage: ./scripts/new-project.sh 'project-name' 'idea'"
[ -z "$IDEA" ] && error "Usage: ./scripts/new-project.sh 'project-name' 'idea'"

check_prereqs
