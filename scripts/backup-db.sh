#!/bin/bash
# Backup script for SQLite database
# Add to crontab: 0 3 * * * /home/user/sdf-siti/scripts/backup-db.sh

set -e

PROJECT_DIR="$HOME/sdf-siti"
BACKUP_DIR="$PROJECT_DIR/backups"
DB_FILE="$PROJECT_DIR/data/sdf-health-local.db"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

if [ -f "$DB_FILE" ]; then
    cp "$DB_FILE" "$BACKUP_DIR/sdf-health-local_$DATE.db"
    # Keep only last 30 backups
    ls -tp "$BACKUP_DIR"/*.db | grep -v '/$' | tail -n +31 | xargs -I {} rm -- {}
    echo "Backup created: $BACKUP_DIR/sdf-health-local_$DATE.db"
else
    echo "Database not found at $DB_FILE"
    exit 1
fi
