# Render Deployment Checklist

## ✅ Files Created

- [x] `requirements.txt` - Python dependencies including gunicorn, whitenoise, psycopg2
- [x] `runtime.txt` - Python 3.13.0 version specification
- [x] `build.sh` - Render build script (npm + Django setup)
- [x] `.env.example` - Environment variable template
- [x] `RENDER_DEPLOYMENT.md` - Complete deployment guide

## ✅ Settings Updated

- [x] Added `dj_database_url` for PostgreSQL support
- [x] Added `whitenoise` middleware for static files
- [x] Updated `ALLOWED_HOSTS` to include `.onrender.com`
- [x] Changed `DEBUG` default to `False`
- [x] Added conditional database configuration (PostgreSQL/SQLite)
- [x] Added production security settings (SSL, HSTS, secure cookies)
- [x] Configured `STATICFILES_STORAGE` for whitenoise

## 🚀 Next Steps on Render

### 1. Push to GitHub

```bash
git add .
git commit -m "🚀 Add Render deployment configuration"
git push origin master
```

### 2. Create Render Web Service

- Go to https://dashboard.render.com/
- Click "New +" → "Web Service"
- Connect GitHub repo: `Bennymens/Diamond-Band`
- Branch: `master`

### 3. Configure Service

**Build Command:** `./build.sh`
**Start Command:** `gunicorn diamond_band_website.wsgi:application`

### 4. Set Environment Variables

```
SECRET_KEY=<generate-new-key>
DEBUG=False
ALLOWED_HOSTS=<your-app>.onrender.com
```

### 5. Deploy

- Click "Create Web Service"
- Wait for automatic build and deployment
- Monitor logs for any issues

### 6. Post-Deployment

```bash
# Create superuser in Render Shell
python manage.py createsuperuser
```

## 📋 Environment Variables Reference

**Required:**

- `SECRET_KEY` - Django secret key (generate new)
- `DEBUG` - Set to `False` for production
- `ALLOWED_HOSTS` - Your Render domain
- `DATABASE_URL` - Auto-provided by Render

**Optional:**

- `EMAIL_HOST` - SMTP server (default: smtp.gmail.com)
- `EMAIL_PORT` - SMTP port (default: 587)
- `EMAIL_USE_TLS` - Enable TLS (default: True)
- `EMAIL_HOST_USER` - Email address
- `EMAIL_HOST_PASSWORD` - Email password/app password

## 🔑 Generate Secret Key

Run this locally:

```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

## ✨ Features Ready for Production

- ✅ CircularGallery 3D React component
- ✅ Custom hero section with band images
- ✅ Contact forms with crispy-bootstrap5
- ✅ Gallery, blog, services sections
- ✅ Admin panel
- ✅ Mobile-responsive design
- ✅ Static file serving with whitenoise
- ✅ PostgreSQL database support
- ✅ Security headers and HTTPS

## 🐛 Common Issues

**Build fails:**

- Check Python version in `runtime.txt`
- Verify all dependencies in `requirements.txt`
- Review build logs in Render dashboard

**Static files not loading:**

- Run `python manage.py collectstatic --no-input` (already in build.sh)
- Verify whitenoise is in `MIDDLEWARE`
- Check `STATICFILES_STORAGE` setting

**Database errors:**

- Render auto-creates PostgreSQL database
- Verify `DATABASE_URL` is set automatically
- Check migrations ran successfully

**Server won't start:**

- Verify `gunicorn` is in requirements.txt
- Check start command: `gunicorn diamond_band_website.wsgi:application`
- Review application logs

## 📝 Notes

- Free tier spins down after 15 min of inactivity
- First request after spin-down takes ~30 seconds
- Upgrade to paid tier for production use
- Database is separate service (automatically linked)

## 🎸 Your Diamond Band website is ready for the world!
