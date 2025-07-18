#!/usr/bin/env bash

# Create the database file if not exists
mkdir -p database
touch database/database.sqlite

# Run migrations
php artisan migrate --force

# Start Laravel
php artisan serve --host=0.0.0.0 --port=8000
