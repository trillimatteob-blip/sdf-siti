#!/bin/bash
set -e

echo "==================================="
echo " SDF Dashboard - Setup VPS Completo"
echo "==================================="
echo ""

# 1. Aggiorna sistema
echo "[1/8] Aggiornamento sistema..."
apt update && apt upgrade -y

# 2. Installa dipendenze base
echo "[2/8] Installazione dipendenze..."
apt install -y git curl ca-certificates

# 3. Installa Docker
echo "[3/8] Installazione Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    usermod -aG docker $USER
    echo "Docker installato."
else
    echo "Docker già installato."
fi

# 4. Aggiungi swap (4GB)
echo "[4/8] Configurazione swap..."
if [ ! -f /swapfile ]; then
    fallocate -l 4G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo "/swapfile none swap sw 0 0" >> /etc/fstab
    echo "Swap 4GB creato."
else
    echo "Swap già presente."
fi
free -h | grep Swap

# 5. Clona repo
echo "[5/8] Clone repository..."
PROJECT_DIR="$HOME/sdf-siti"
if [ ! -d "$PROJECT_DIR/.git" ]; then
    rm -rf "$PROJECT_DIR"
    git clone https://github.com/trillimatteob-blip/sdf-siti.git "$PROJECT_DIR"
    echo "Repository clonato."
else
    cd "$PROJECT_DIR"
    git pull origin main
    echo "Repository aggiornato."
fi

cd "$PROJECT_DIR"

# 6. Crea directory data
echo "[6/8] Creazione directory dati..."
mkdir -p data uploads

# 7. Crea .env se non esiste
echo "[7/8] Configurazione ambiente..."
if [ ! -f .env ]; then
    cat > .env << 'EOF'
# === VARIABILI DA COMPILARE ===
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=https://my.salutediferro.com
ANTHROPIC_API_KEY=
# ================================
EOF
    echo ""
    echo "ATTENZIONE: File .env creato con valori vuoti."
    echo "Devi modificarlo con i tuoi valori reali prima di avviare."
    echo "Comando: nano ~/sdf-siti/.env"
    echo ""
else
    echo "File .env già presente."
fi

# 8. Build e avvia
echo "[8/8] Build e avvio containers..."
docker compose -f docker-compose.prod.yml up --build -d

echo ""
echo "==================================="
echo " Setup completato!"
echo "==================================="
echo ""
echo "Prossimi passi:"
echo "  1. Se il file .env è vuoto, compila le variabili:"
echo "     nano ~/sdf-siti/.env"
echo ""
echo "  2. Dopo aver compilato .env, riavvia:"
echo "     docker compose -f ~/sdf-siti/docker-compose.prod.yml up --build -d"
echo ""
echo "  3. Verifica i log:"
echo "     docker logs -f sdf-dashboard"
echo ""
echo "  4. Verifica Caddy:"
echo "     docker logs -f sdf-caddy"
echo ""
