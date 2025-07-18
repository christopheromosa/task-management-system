#!/bin/sh
mkdir -p database
touch database/database.sqlite

php artisan key:generate
php artisan config:cache
php artisan migrate --force
php artisan serve --host=0.0.0.0 --port=8000
