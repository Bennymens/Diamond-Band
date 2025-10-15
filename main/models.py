from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.utils.text import slugify
from django.core.mail import send_mail
from django.conf import settings


class BandMember(models.Model):
    """Band members with their roles and information"""
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)  # Lead Vocalist, Guitarist, etc.
    bio = models.TextField()
    image = models.ImageField(upload_to='band_members/', blank=True, null=True)
    instagram = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order', 'name']
    
    def __str__(self):
        return f"{self.name} - {self.role}"


class Service(models.Model):
    """Services offered by the band"""
    SERVICE_TYPES = [
        ('live_performance', 'Live Performance'),
        ('studio_recording', 'Studio Recording'),
        ('carpet_band', 'Carpet Band'),
        ('sound_setup', 'Sound Setup'),
    ]
    
    name = models.CharField(max_length=100)
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPES)
    description = models.TextField()
    short_description = models.CharField(max_length=200)
    price_range = models.CharField(max_length=100, blank=True)
    duration = models.CharField(max_length=50, blank=True)
    features = models.TextField(help_text="One feature per line")
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    icon = models.CharField(max_length=50, help_text="Font Awesome icon class")
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name
    
    @property
    def features_list(self):
        return [f.strip() for f in self.features.split('\n') if f.strip()]


class GalleryItem(models.Model):
    """Gallery items - photos, videos, audio"""
    MEDIA_TYPES = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('audio', 'Audio'),
    ]
    
    EVENT_TYPES = [
        ('wedding', 'Wedding'),
        ('corporate', 'Corporate Event'),
        ('concert', 'Concert'),
        ('ceremony', 'Official Ceremony'),
        ('party', 'Party'),
        ('festival', 'Festival'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPES)
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    event_date = models.DateField()
    event_location = models.CharField(max_length=200, blank=True)
    
    # Media files
    image = models.ImageField(upload_to='gallery/images/', blank=True, null=True)
    video_url = models.URLField(blank=True, help_text="YouTube, Vimeo URL")
    video_file = models.FileField(upload_to='gallery/videos/', blank=True, null=True)
    audio_file = models.FileField(upload_to='gallery/audio/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='gallery/thumbnails/', blank=True, null=True)
    
    is_featured = models.BooleanField(default=False)
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-event_date', '-created_at']
    
    def __str__(self):
        return self.title


class BookingInquiry(models.Model):
    """Booking inquiries from clients"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    EVENT_TYPES = [
        ('wedding', 'Wedding'),
        ('corporate', 'Corporate Event'),
        ('party', 'Private Party'),
        ('ceremony', 'Official Ceremony'),
        ('concert', 'Concert/Show'),
        ('festival', 'Festival'),
        ('other', 'Other'),
    ]
    
    # Client Info
    client_name = models.CharField(max_length=200)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=20)
    client_company = models.CharField(max_length=200, blank=True)
    
    # Event Info
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    event_title = models.CharField(max_length=200)
    event_date = models.DateField()
    event_start_time = models.TimeField()
    event_end_time = models.TimeField()
    event_location = models.TextField()
    expected_guests = models.PositiveIntegerField()
    
    # Requirements
    service_requested = models.TextField()
    special_requirements = models.TextField(blank=True)
    budget_range = models.CharField(max_length=100, blank=True)
    how_heard_about_us = models.CharField(max_length=200, blank=True)
    
    # Admin
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    admin_notes = models.TextField(blank=True)
    quoted_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.client_name} - {self.event_title}"


class ContactMessage(models.Model):
    """Contact form messages"""
    SUBJECT_CHOICES = [
        ('general', 'General Inquiry'),
        ('booking', 'Booking Inquiry'),
        ('collaboration', 'Collaboration'),
        ('media', 'Media/Press'),
        ('feedback', 'Feedback'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=20, choices=SUBJECT_CHOICES)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.get_subject_display()}"


class BlogPost(models.Model):
    """Blog posts for news and updates"""
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    excerpt = models.TextField(max_length=300)
    content = models.TextField()
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    is_featured = models.BooleanField(default=False)
    published_date = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-published_date']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('blog_detail', kwargs={'slug': self.slug})


class Testimonial(models.Model):
    """Client testimonials"""
    client_name = models.CharField(max_length=200)
    client_company = models.CharField(max_length=200, blank=True)
    testimonial = models.TextField()
    rating = models.PositiveIntegerField(default=5, choices=[(i, i) for i in range(1, 6)])
    event_type = models.CharField(max_length=100, blank=True)
    event_date = models.DateField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.client_name} - {self.rating} stars"


class SiteSettings(models.Model):
    """Site-wide settings"""
    site_title = models.CharField(max_length=100, default="Diamond Band")
    tagline = models.CharField(max_length=200, default="Premium Live Music Experience")
    about_text = models.TextField(default="Professional Christian band for all occasions")
    phone = models.CharField(max_length=20, default="+1 (234) 567-890")
    email = models.EmailField(default="info@diamondband.com")
    address = models.TextField(default="Available Nationwide")
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    
    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
    
    def __str__(self):
        return "Site Settings"
