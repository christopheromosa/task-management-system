#!/bin/sh

# Generate APP_KEY if not set in environment (for Render)
if [ -z "$APP_KEY" ]; then
    echo "WARNING: APP_KEY is empty, generating new one"
    php artisan key:generate
fi

# Database setup
if [ "$DB_CONNECTION" = "sqlite" ]; then
    # SQLite setup (not recommended for production)
    touch database/database.sqlite
    echo "Using SQLite database at database/database.sqlite"
    
    # Optional: Backup/restore from /tmp (ephemeral storage)
    if [ -f /tmp/database.sqlite ]; then
        echo "Restoring SQLite database from /tmp backup"
        cp /tmp/database.sqlite database/database.sqlite
    fi
else
    # Wait for PostgreSQL to be ready (if using)
    if [ "$DB_CONNECTION" = "pgsql" ]; then
        echo "Waiting for PostgreSQL to be ready..."
        until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USERNAME; do
            sleep 1
        done
    fi
fi

# Run database migrations
php artisan migrate --force

# Prefill database if needed (seed)
# php artisan db:seed --force

# Clear and cache everything
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Backup SQLite database on shutdown (if using SQLite)
if [ "$DB_CONNECTION" = "sqlite" ]; then
    trap "echo 'Backing up SQLite database to /tmp'; cp database/database.sqlite /tmp/database.sqlite" EXIT
fi

# Start Laravel server
php artisan serve --host=0.0.0.0 --port=8000