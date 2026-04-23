#!/bin/bash
set -e

echo "=== SDF Dashboard — VPS Setup ==="

# 1. Install Docker if missing
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker "$USER"
    echo "Docker installed. Please log out and back in, then re-run this script."
    exit 0
fi

# 2. Create project directory
PROJECT_DIR="$HOME/sdf-siti"
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# 3. Create data directory
mkdir -p data

# 4. Download compose and Caddyfile from GitHub (or copy manually)
if [ ! -f docker-compose.prod.yml ]; then
    echo "Please copy docker-compose.prod.yml, Caddyfile and .env to $PROJECT_DIR first."
    echo "From your local machine:"
    echo "  scp docker-compose.prod.yml Caddyfile .env user@$HOSTNAME:$PROJECT_DIR/"
    exit 1
fi

# 5. Login to GitHub Container Registry
echo "Logging in to GitHub Container Registry..."
echo "You need a GitHub Personal Access Token with 'read:packages' scope."
read -rp "GitHub PAT: " GHCR_TOKEN
read -rp "GitHub username: " GHCR_USER
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin

# 6. Pull and start
echo "Starting services..."
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d

echo ""
echo "=== Setup complete ==="
echo "App should be available at https://my.salutediferro.com"
echo ""
echo "Useful commands:"
echo "  docker logs -f sdf-dashboard    # App logs"
echo "  docker logs -f sdf-caddy        # Caddy logs"
echo "  docker compose -f docker-compose.prod.yml ps"
