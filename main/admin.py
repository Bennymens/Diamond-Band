from django.contrib import admin
from .models import (
    BandMember, Service, GalleryItem, BookingInquiry, 
    ContactMessage, BlogPost, Testimonial, SiteSettings
)


@admin.register(BandMember)
class BandMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'order', 'is_active']
    list_filter = ['role', 'is_active']
    ordering = ['order', 'name']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'service_type', 'is_featured', 'order']
    list_filter = ['service_type', 'is_featured']
    ordering = ['order', 'name']


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'media_type', 'event_type', 'event_date', 'is_featured', 'is_public']
    list_filter = ['media_type', 'event_type', 'is_featured', 'is_public', 'event_date']
    ordering = ['-event_date']
    search_fields = ['title', 'description']


@admin.register(BookingInquiry)
class BookingInquiryAdmin(admin.ModelAdmin):
    list_display = [
        'booking_reference', 'client_name', 'event_title', 'event_date',
        'package', 'total_amount', 'status', 'created_at'
    ]
    list_filter = ['status', 'event_type', 'package', 'created_at', 'event_date']
    ordering = ['-created_at']
    search_fields = ['client_name', 'client_email', 'event_title', 'booking_reference']
    readonly_fields = ['created_at', 'updated_at', 'booking_reference']
    list_editable = ['status']
    actions = ['mark_as_confirmed', 'mark_as_pending', 'mark_as_cancelled']

    fieldsets = (
        ('Booking Information', {
            'fields': ('booking_reference', 'status', 'created_at', 'updated_at')
        }),
        ('Client Details', {
            'fields': ('client_name', 'client_email', 'client_phone')
        }),
        ('Event Details', {
            'fields': (
                'event_type', 'event_title', 'event_date',
                'event_start_time', 'event_end_time', 'event_location',
                'expected_guests'
            )
        }),
        ('Package & Pricing', {
            'fields': ('package', 'total_amount', 'budget_range')
        }),
        ('Service Details', {
            'fields': ('service_requested', 'special_requirements')
        }),
        ('Additional Information', {
            'fields': ('heard_about_us',)
        }),
    )

    def mark_as_confirmed(self, request, queryset):
        queryset.update(status='confirmed')
        self.message_user(request, f"{queryset.count()} booking(s) marked as confirmed.")
    mark_as_confirmed.short_description = "Mark selected bookings as confirmed"

    def mark_as_pending(self, request, queryset):
        queryset.update(status='pending')
        self.message_user(request, f"{queryset.count()} booking(s) marked as pending.")
    mark_as_pending.short_description = "Mark selected bookings as pending"

    def mark_as_cancelled(self, request, queryset):
        queryset.update(status='cancelled')
        self.message_user(request, f"{queryset.count()} booking(s) marked as cancelled.")
    mark_as_cancelled.short_description = "Mark selected bookings as cancelled"


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'subject', 'email', 'is_read', 'created_at']
    list_filter = ['subject', 'is_read', 'created_at']
    ordering = ['-created_at']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['created_at']


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'is_featured', 'published_date']
    list_filter = ['status', 'is_featured', 'published_date']
    ordering = ['-published_date']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'rating', 'event_type', 'is_featured', 'created_at']
    list_filter = ['rating', 'is_featured', 'event_type', 'created_at']
    ordering = ['-created_at']


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Only allow one SiteSettings instance
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Don't allow deletion of SiteSettings
        return False
