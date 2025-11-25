from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import TemplateView, FormView, DetailView
from django.contrib import messages
from django.urls import reverse_lazy
from django.http import JsonResponse
from django.db.models import Q
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from .models import (
    BandMember, Service, GalleryItem, BookingInquiry, 
    ContactMessage, BlogPost, Testimonial, SiteSettings
)
from .forms import BookingInquiryForm, ContactMessageForm


def home(request):
    """Homepage view"""
    # Process stats data in Python for better performance
    stats_raw = "500,Events Performed,100|50,Cities Visited,200|1000,Happy Clients,300|10,Years Experience,400"
    stats = [s.split(',') for s in stats_raw.split('|')]
    
    context = {
        'band_members': BandMember.objects.filter(is_active=True)[:4],
        'featured_services': Service.objects.filter(is_featured=True)[:3],
        'featured_gallery': GalleryItem.objects.filter(is_featured=True, is_public=True)[:6],
        'testimonials': Testimonial.objects.filter(is_featured=True)[:3],
        'latest_posts': BlogPost.objects.filter(status='published')[:3],
        'site_settings': SiteSettings.objects.first(),
        'stats': stats,  # Add processed stats data
    }
    return render(request, 'main/home.html', context)


def about(request):
    """About page view"""
    context = {
        'band_members': BandMember.objects.filter(is_active=True),
        'site_settings': SiteSettings.objects.first(),
    }
    return render(request, 'main/about.html', context)


def services(request):
    """Services page view"""
    context = {
        'services': Service.objects.all(),
        'featured_services': Service.objects.filter(is_featured=True),
    }
    return render(request, 'main/services.html', context)


def gallery(request):
    """Gallery page view"""
    # Get filter parameters
    event_type = request.GET.get('event_type', 'all')
    media_type = request.GET.get('media_type', 'all')
    year = request.GET.get('year', 'all')
    
    # Filter gallery items
    items = GalleryItem.objects.filter(is_public=True)
    
    if event_type != 'all':
        items = items.filter(event_type=event_type)
    if media_type != 'all':
        items = items.filter(media_type=media_type)
    if year != 'all':
        items = items.filter(event_date__year=year)
    
    context = {
        'gallery_items': items,
        'event_types': GalleryItem.EVENT_TYPES,
        'media_types': GalleryItem.MEDIA_TYPES,
        'years': GalleryItem.objects.dates('event_date', 'year'),
        'current_filters': {
            'event_type': event_type,
            'media_type': media_type,
            'year': year,
        }
    }
    return render(request, 'main/gallery.html', context)


def gallery_filter_ajax(request):
    """AJAX endpoint for gallery filtering"""
    event_type = request.GET.get('event_type', 'all')
    media_type = request.GET.get('media_type', 'all')
    year = request.GET.get('year', 'all')
    
    items = GalleryItem.objects.filter(is_public=True)
    
    if event_type != 'all':
        items = items.filter(event_type=event_type)
    if media_type != 'all':
        items = items.filter(media_type=media_type)
    if year != 'all':
        items = items.filter(event_date__year=year)
    
    data = []
    for item in items:
        data.append({
            'id': item.id,
            'title': item.title,
            'description': item.description,
            'media_type': item.media_type,
            'event_type': item.get_event_type_display(),
            'event_date': item.event_date.strftime('%Y-%m-%d'),
            'image_url': item.image.url if item.image else '',
            'video_url': item.video_url,
        })
    
    return JsonResponse({'items': data})


class BookingView(FormView):
    """Booking page view"""
    template_name = 'main/Booking.html'
    form_class = BookingInquiryForm
    success_url = reverse_lazy('booking_success')
    
    def form_valid(self, form):
        # Save the booking
        booking = form.save()
        
        # Send confirmation emails
        self.send_booking_emails(booking)
        
        messages.success(
            self.request, 
            f'Thank you {booking.client_name}! Your booking inquiry has been submitted. '
            f'Check your email for confirmation (Reference: {booking.booking_reference})'
        )
        
        return super().form_valid(form)
    
    def send_booking_emails(self, booking):
        """Send confirmation emails to both client and band"""
        
        # Email to client
        client_subject = f'Booking Confirmation - Diamond Band ({booking.booking_reference})'
        client_context = {
            'booking': booking,
            'band_logo_url': f"{settings.SITE_URL}/static/images/band-logo.png"
        }
        client_html = render_to_string('emails/booking_confirmation_client.html', client_context)
        client_text = render_to_string('emails/booking_confirmation_client.txt', client_context)
        
        send_mail(
            subject=client_subject,
            message=client_text,
            html_message=client_html,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[booking.client_email],
            fail_silently=True
        )
        
        # Email to band
        band_subject = f'New Booking Inquiry - {booking.client_name} ({booking.event_date})'
        band_context = {
            'booking': booking,
            'admin_url': f"{settings.SITE_URL}/admin/main/bookinginquiry/{booking.id}/change/"
        }
        band_html = render_to_string('emails/booking_notification_band.html', band_context)
        band_text = render_to_string('emails/booking_notification_band.txt', band_context)
        
        send_mail(
            subject=band_subject,
            message=band_text,
            html_message=band_html,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.BAND_EMAIL],
            fail_silently=True
        )


def booking_success(request):
    """Booking success page"""
    return render(request, 'main/booking_success.html')


class ContactView(FormView):
    """Contact page view"""
    template_name = 'main/contact.html'
    form_class = ContactMessageForm
    success_url = reverse_lazy('contact_success')
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['site_settings'] = SiteSettings.objects.first()
        return context
    
    def form_valid(self, form):
        message = form.save()
        messages.success(
            self.request, 
            'Your message has been sent successfully! We will get back to you soon.'
        )
        return super().form_valid(form)


def contact_success(request):
    """Contact success page"""
    return render(request, 'main/contact_success.html')


def blog(request):
    """Blog list page"""
    posts = BlogPost.objects.filter(status='published')
    featured_posts = posts.filter(is_featured=True)[:3]
    
    context = {
        'posts': posts,
        'featured_posts': featured_posts,
    }
    return render(request, 'main/blog.html', context)


def blog_detail(request, slug):
    """Blog post detail page"""
    post = get_object_or_404(BlogPost, slug=slug, status='published')
    related_posts = BlogPost.objects.filter(status='published').exclude(id=post.id)[:3]
    
    context = {
        'post': post,
        'related_posts': related_posts,
    }
    return render(request, 'main/blog_detail.html', context)
