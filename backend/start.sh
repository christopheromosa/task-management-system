#!/bin/sh

# Create SQLite database file if it doesn't exist
touch database/database.sqlite

# Run database migrations
php artisan migrate --force

# Prefill database if needed (seed)
# php artisan db:seed --force

# Clear and cache everything
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM (or Laravel's built-in server)
php artisan serve --host=0.0.0.0 --port=8000