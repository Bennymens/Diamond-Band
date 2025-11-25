#!/usr/bin/env python
"""
Test script for Diamond Band booking system
"""
import os
import sys
import django
from datetime import datetime, time

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'diamond_band_website.settings')
django.setup()

from main.models import BookingInquiry
from main.forms import BookingInquiryForm

def test_booking_creation():
    """Test creating a booking inquiry"""
    print("Testing booking creation...")

    # Test data
    booking_data = {
        'client_name': 'Test Client',
        'client_email': 'test@example.com',
        'client_phone': '+1234567890',
        'event_type': 'wedding',
        'event_title': 'Test Wedding Event',
        'event_date': datetime(2025, 12, 25).date(),
        'event_start_time': time(18, 0),
        'event_end_time': time(22, 0),
        'event_location': 'Test Venue, City',
        'expected_guests': 150,
        'package': 'premium',
        'budget_range': '$5000-$10000',
        'service_requested': 'Full band performance with sound system',
        'special_requirements': 'Need vegetarian catering options',
        'how_heard_about_us': 'social_media'
    }

    # Create booking
    booking = BookingInquiry.objects.create(**booking_data)

    print(f"✓ Booking created successfully!")
    print(f"  Reference: {booking.booking_reference}")
    print(f"  Package: {booking.get_package_display()}")
    print(f"  Amount: ${booking.total_amount}")
    print(f"  Status: {booking.status}")

    return booking

def test_form_validation():
    """Test booking form validation"""
    print("\nTesting form validation...")

    # Valid data
    valid_data = {
        'client_name': 'Valid Client',
        'client_email': 'valid@example.com',
        'client_phone': '+1234567890',
        'event_type': 'corporate',
        'event_title': 'Corporate Event',
        'event_date': datetime(2025, 12, 31).date(),
        'event_start_time': time(19, 0),
        'event_end_time': time(23, 0),
        'event_location': 'Corporate Venue',
        'expected_guests': 100,
        'package': 'basic',
        'budget_range': '$3000-$5000',
        'service_requested': 'Band performance',
        'how_heard_about_us': 'website'
    }

    form = BookingInquiryForm(data=valid_data)
    if form.is_valid():
        print("✓ Form validation passed!")
        booking = form.save()
        print(f"  Saved booking: {booking.booking_reference}")
        return True
    else:
        print("✗ Form validation failed:")
        for field, errors in form.errors.items():
            print(f"  {field}: {errors}")
        return False

def test_admin_fields():
    """Test that admin fields are working"""
    print("\nTesting admin functionality...")

    # Get a booking
    booking = BookingInquiry.objects.first()
    if booking:
        print(f"✓ Booking found: {booking.booking_reference}")
        print(f"  Admin URL would be: /admin/main/bookinginquiry/{booking.id}/change/")
        print(f"  Status: {booking.status}")
        print(f"  Created: {booking.created_at}")
        print(f"  Updated: {booking.updated_at}")
        return True
    else:
        print("✗ No bookings found")
        return False

def main():
    """Run all tests"""
    print("🧪 Diamond Band Booking System Tests")
    print("=" * 40)

    try:
        # Test booking creation
        booking = test_booking_creation()

        # Test form validation
        form_valid = test_form_validation()

        # Test admin functionality
        admin_working = test_admin_fields()

        print("\n" + "=" * 40)
        if booking and form_valid and admin_working:
            print("🎉 All tests passed!")
            print("\nNext steps:")
            print("1. Visit http://127.0.0.1:8000/booking/ to test the booking form")
            print("2. Visit http://127.0.0.1:8000/admin/ to manage bookings")
            print("3. Check email templates in templates/emails/")
        else:
            print("❌ Some tests failed")

    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()