# Diamond Band Website

A professional Django-based website for Diamond Band, a Christian band specializing in live music performances for weddings, corporate events, and special occasions.

## Features

- **Modern Design**: Black, gold, and white color scheme with responsive Bootstrap layout
- **Band Management**: Comprehensive band member profiles and information
- **Service Catalog**: Display of different musical services offered
- **Gallery**: Photo and video gallery of performances and events
- **Booking System**: Online booking inquiry form for events
- **Blog**: News and announcements section
- **Contact Management**: Contact form and message handling
- **Admin Interface**: Easy content management through Django admin

## Technology Stack

- **Backend**: Django 5.2.7, Python 3.13
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Database**: SQLite (development), PostgreSQL ready (production)
- **Styling**: Custom CSS with Font Awesome icons
- **Animations**: AOS (Animate On Scroll) library

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/diamond-band-website.git
cd diamond-band-website
```

2. Create a virtual environment:
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
# or
source .venv/bin/activate  # Linux/Mac
```

3. Install dependencies:
```bash
pip install django crispy-bootstrap5 python-decouple pillow
```

4. Create environment file:
```bash
cp .env.example .env
# Edit .env with your settings
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create superuser:
```bash
python manage.py createsuperuser
```

7. Run the development server:
```bash
python manage.py runserver
```

## Project Structure

```
diamond-band-website/
├── main/                   # Main Django app
│   ├── models.py          # Database models
│   ├── views.py           # View logic
│   ├── forms.py           # Django forms
│   ├── admin.py           # Admin configuration
│   └── urls.py            # URL patterns
├── templates/             # HTML templates
│   ├── base.html          # Base template
│   └── main/              # App-specific templates
├── static/                # Static files (CSS, JS, images)
├── diamond_band_website/  # Django project settings
└── manage.py              # Django management script
```

## Models

- **BandMember**: Band member profiles and information
- **Service**: Musical services offered
- **GalleryItem**: Photos and videos from performances
- **BookingInquiry**: Event booking requests
- **ContactMessage**: Contact form submissions
- **BlogPost**: News and announcements
- **Testimonial**: Client testimonials
- **SiteSettings**: Global site configuration

## Usage

1. Access the admin panel at `/admin/` to manage content
2. Add band members, services, gallery items, and blog posts
3. Configure site settings and testimonials
4. The website will automatically display the content on the frontend

## Development

- The project uses a single Django app architecture for simplicity
- Template logic is kept minimal with data processing done in views
- Responsive design ensures compatibility across all devices
- Clean separation of concerns between models, views, and templates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary to Diamond Band.

## Contact

For inquiries about Diamond Band's services, visit the website or contact through the provided contact form.