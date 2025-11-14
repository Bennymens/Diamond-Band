#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies and build React components
npm install
npm run build

# Collect static files
python manage.py collectstatic --no-input

# Run database migrations
python manage.py migrate
