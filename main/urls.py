from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('gallery/', views.gallery, name='gallery'),
    path('gallery/filter/', views.gallery_filter_ajax, name='gallery_filter'),
    path('booking/', views.BookingView.as_view(), name='booking'),
    path('booking/success/', views.booking_success, name='booking_success'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('contact/success/', views.contact_success, name='contact_success'),
    path('news/', views.blog, name='news'),
    path('news/<slug:slug>/', views.blog_detail, name='news_detail'),
    path('first-love-music/', views.first_love_music, name='first_love_music'),
]