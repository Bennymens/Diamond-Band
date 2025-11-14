# Diamond Band Website - Render Deployment Guide

## Prerequisites

- GitHub repository connected to Render
- Render account (free tier works)

## Render Setup Instructions

### 1. Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `Bennymens/Diamond-Band`

### 2. Configure Web Service

**Basic Settings:**

- **Name:** `diamond-band` (or your preferred name)
- **Region:** Choose closest to your users
- **Branch:** `master`
- **Runtime:** `Python 3`
- **Build Command:** `./build.sh`
- **Start Command:** `gunicorn diamond_band_website.wsgi:application`

**Instance Type:**

- Free tier is sufficient for development
- Upgrade to paid for production traffic

### 3. Environment Variables

Add these in the Render dashboard under "Environment":

**Required:**

```
SECRET_KEY=<generate-a-new-secret-key>
DEBUG=False
ALLOWED_HOSTS=your-app-name.onrender.com
PYTHON_VERSION=3.13.0
```

**Optional (Email):**

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### 4. Database Setup

Render will automatically create and connect a PostgreSQL database:

1. In your web service, go to "Environment" tab
2. Render provides `DATABASE_URL` automatically
3. No manual database configuration needed!

### 5. Generate Secret Key

Run locally to generate a new secret key:

```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 6. Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Install Python dependencies
   - Install Node.js dependencies
   - Build React components
   - Collect static files
   - Run database migrations
   - Start gunicorn server

### 7. Post-Deployment

**Create Superuser:**

```bash
# In Render Shell (Web Service → Shell tab)
python manage.py createsuperuser
```

**Check Logs:**

- Go to "Logs" tab to monitor deployment
- Watch for any errors during build or runtime

## Local Development

**Setup:**

```powershell
cd "C:\Users\PC\OneDrive\Desktop\Diamond band"

# Create .env file from example
copy .env.example .env

# Edit .env with your local settings
# Set DEBUG=True for development

# Install dependencies
.\.venv\Scripts\pip.exe install -r requirements.txt

# Install Node dependencies
npm install

# Build React components
npm run build

# Run migrations
.\.venv\Scripts\python.exe manage.py migrate

# Start development server
.\.venv\Scripts\python.exe manage.py runserver
```

## Troubleshooting

### Build Fails

- Check build logs in Render dashboard
- Verify `runtime.txt` Python version matches
- Ensure all dependencies in `requirements.txt`

### Static Files Not Loading

- Verify `STATICFILES_STORAGE` is set correctly
- Check whitenoise is installed
- Run `python manage.py collectstatic` manually

### Database Connection Issues

- Verify `DATABASE_URL` is set automatically by Render
- Check PostgreSQL database is created and linked

### Application Crashes

- Check application logs in Render
- Verify environment variables are set
- Ensure `DEBUG=False` in production

## Features Included

✅ **Production-Ready Settings:**

- Whitenoise for static file serving
- PostgreSQL database support
- Security headers and SSL redirect
- Gunicorn WSGI server

✅ **React Components:**

- Webpack bundling
- CircularGallery 3D component
- Automatic build in deployment

✅ **Django Features:**

- Custom hero section with images
- Contact forms
- Gallery and blog sections
- Admin panel

## Support

For issues, check:

1. Render logs (real-time in dashboard)
2. GitHub repository issues
3. Django documentation

## License

Copyright © 2025 Diamond Band. All rights reserved.
