# Guida Deploy — my.salutediferro.com

Questa guida ti porta da zero a online in ~30 minuti. Segui gli step nell'ordine.

---

## Step 1: Acquista VPS (Hetzner)

1. Vai su [console.hetzner.cloud](https://console.hetzner.cloud)
2. Crea un progetto → Add Server
3. Impostazioni:
   - **Location**: Falkenstein (Germania)
   - **Image**: Ubuntu 22.04 LTS
   - **Type**: CX11 (1 vCPU, 2GB RAM, 20GB SSD)
   - **Costo**: €4.51/mese
4. Inserisci carta di credito e paga
5. **Copia l'IP pubblico** del server (es. `123.45.67.89`)

---

## Step 2: Configura DNS su Cloudflare

### 2.1 Registrati
- Vai su [dash.cloudflare.com](https://dash.cloudflare.com)
- Sign up gratis (email + password)

### 2.2 Aggiungi il dominio
1. Clicca **"Add a Site"**
2. Inserisci: `salutediferro.com`
3. Clicca **Continue**
4. Seleziona piano **Free** ($0)
5. Clicca **Continue**

### 2.3 Copia i nameserver
Cloudflare ti mostra 2 nameserver, tipo:
```
lara.ns.cloudflare.com
greg.ns.cloudflare.com
```
**Copiali** (Cmd+C)

### 2.4 Cambia nameserver su Vercel
1. Vai su [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clicca sul progetto → **Settings** → **Domains**
3. Clicca su `salutediferro.com`
4. Trova la sezione **Nameservers**
5. Sostituisci con i 2 nameserver di Cloudflare
6. Salva

### 2.5 Verifica su Cloudflare
1. Torna su [dash.cloudflare.com](https://dash.cloudflare.com)
2. Clicca **"Done, check nameservers"**
3. Aspetta che diventi verde (5-30 min)

### 2.6 Aggiungi record A
1. Vai su **DNS** → **Records**
2. Clicca **"Add record"**
3. Compila:
   | Campo | Valore |
   |-------|--------|
   | Type | `A` |
   | Name | `my` |
   | IPv4 address | `IP_DEL_TUO_VPS` |
   | TTL | Auto |
   | Proxy status | **DNS only** (icona grigia) |
4. Salva

⚠️ **IMPORTANTE**: l'icona proxy deve essere GRIGIA (spenta). Se è arancione, Caddy non ottiene il certificato SSL.

---

## Step 3: Crea GitHub Personal Access Token

1. Vai su [github.com/settings/tokens](https://github.com/settings/tokens)
2. Clicca **"Generate new token (classic)"**
3. **Note**: `VPS Docker Pull`
4. **Expiration**: No expiration
5. **Scopes**: spunta solo `read:packages`
6. Clicca **Generate token**
7. **Copia il token** (inizia con `ghp_`)

---

## Step 4: Configura GitHub Secrets

1. Vai su GitHub Repo → **Settings** → **Secrets and variables** → **Actions**
2. Clicca **"New repository secret"**
3. Aggiungi questi 4 secrets:

| Nome | Valore |
|------|--------|
| `SSH_HOST` | IP del VPS (es. `123.45.67.89`) |
| `SSH_USER` | `root` |
| `SSH_PRIVATE_KEY` | Contenuto di `~/.ssh/id_rsa` sul tuo Mac |
| `SSH_PORT` | `22` |

**Come ottenere SSH_PRIVATE_KEY**:
```bash
# Sul tuo Mac, apri Terminal e scrivi:
cat ~/.ssh/id_rsa
```
Copia TUTTO il contenuto (inizia con `-----BEGIN OPENSSH PRIVATE KEY-----`)

Se non hai la chiave:
```bash
ssh-keygen -t rsa -b 4096 -C "tua@email.com"
ssh-copy-id root@IP_DEL_VPS
```

---

## Step 5: Prepara il VPS

Apri Terminal sul tuo Mac:

```bash
# 1. Entra nel VPS
ssh root@IP_DEL_VPS

# 2. Installa Docker
curl -fsSL https://get.docker.com | sh
usermod -aG docker $USER
exit

# 3. Rientra (aggiorna permessi)
ssh root@IP_DEL_VPS

# 4. Crea cartella progetto
mkdir -p ~/sdf-siti/data && cd ~/sdf-siti
```

---

## Step 6: Copia file di produzione

Apri un **nuovo tab Terminal** sul Mac (non chiudere quello collegato al VPS):

```bash
cd ~/sdf-siti

# Copia i file sul server
scp docker-compose.prod.yml Caddyfile .env root@IP_DEL_VPS:~/sdf-siti/
```

---

## Step 7: Login GitHub Container Registry

Nel Terminal collegato al VPS:

```bash
cd ~/sdf-siti

# Sostituisci USERNAME e TOKEN
echo "ghp_ILTUOTOKEN" | docker login ghcr.io -u USERNAME --password-stdin
```

---

## Step 8: Avvia tutto

Sempre sul VPS:

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

Aspetta 30 secondi.

---

## Step 9: Verifica

Dal tuo Mac:

```bash
# Verifica DNS
dig my.salutediferro.com +short

# Verifica HTTPS
curl -I https://my.salutediferro.com
```

Se vedi `HTTP/2 200`, sei online ✅

---

## Step 10: Backup automatico (opzionale)

Sul VPS:

```bash
crontab -e
```

Aggiungi:
```
0 3 * * * /root/sdf-siti/scripts/backup-db.sh >> /var/log/sdf-backup.log 2>&1
```

Salva. Ogni notte alle 3 AM il DB viene backuppato.

---

## Comandi utili

```bash
# Log app
docker logs -f sdf-dashboard

# Log Caddy (SSL)
docker logs -f sdf-caddy

# Restart app
docker compose -f docker-compose.prod.yml restart sdf-dashboard

# Backup manuale DB
cp ~/sdf-siti/data/sdf-health-local.db ~/backup-$(date +%Y%m%d).db

# Vedere container attivi
docker compose -f docker-compose.prod.yml ps
```

---

## Dopo il primo deploy

Ogni `git push origin main` fa tutto automatico:
1. Build Docker image su GitHub
2. Push su Container Registry
3. Deploy sul VPS
4. Healthcheck

Non devi più toccare il server.
