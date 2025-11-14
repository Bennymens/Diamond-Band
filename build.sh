#!/usr/bin/env bash
# exit on error
set -o errexit

echo "=== Installing Python dependencies ==="
pip install -r requirements.txt

echo "=== Installing Node dependencies ==="
npm install

echo "=== Building React components ==="
npm run build

echo "=== Collecting static files ==="
python manage.py collectstatic --no-input --clear

echo "=== Running database migrations ==="
python manage.py migrate --no-input

echo "=== Build completed successfully ==="
