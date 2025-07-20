# Use official PHP image with extensions needed by Laravel
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    sqlite3 \
    libsqlite3-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_sqlite mbstring zip exif pcntl bcmath gd

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy only composer files first for better caching
COPY composer.json composer.lock ./

# Install PHP dependencies (no-dev for production)
RUN composer install --optimize-autoloader --no-dev --no-scripts --no-autoloader

# Copy the rest of the application
COPY . .

# Now optimize the autoloader and run package:discover
RUN composer dump-autoload --optimize && \
    php artisan package:discover --ansi

# Create SQLite database file if it doesn't exist
RUN touch database/database.sqlite

# Set correct permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache


# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8000 || exit 1

# Start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Run the start script
CMD ["/start.sh"]