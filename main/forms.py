from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, Row, Column, HTML
from .models import BookingInquiry, ContactMessage


class BookingInquiryForm(forms.ModelForm):
    class Meta:
        model = BookingInquiry
        fields = [
            'client_name', 'client_email', 'client_phone', 'client_company',
            'event_type', 'event_title', 'event_date', 'event_start_time', 
            'event_end_time', 'event_location', 'expected_guests',
            'service_requested', 'special_requirements', 'budget_range',
            'how_heard_about_us'
        ]
        widgets = {
            'event_date': forms.DateInput(attrs={'type': 'date'}),
            'event_start_time': forms.TimeInput(attrs={'type': 'time'}),
            'event_end_time': forms.TimeInput(attrs={'type': 'time'}),
            'service_requested': forms.Textarea(attrs={'rows': 4}),
            'special_requirements': forms.Textarea(attrs={'rows': 3}),
            'event_location': forms.Textarea(attrs={'rows': 2}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            HTML('<div class="row"><div class="col-12"><h4 class="mb-4 text-gold">Contact Information</h4></div></div>'),
            Row(
                Column('client_name', css_class='form-group col-md-6 mb-3'),
                Column('client_email', css_class='form-group col-md-6 mb-3'),
                css_class='form-row'
            ),
            Row(
                Column('client_phone', css_class='form-group col-md-6 mb-3'),
                Column('client_company', css_class='form-group col-md-6 mb-3'),
                css_class='form-row'
            ),
            HTML('<div class="row"><div class="col-12"><h4 class="mb-4 mt-4 text-gold">Event Details</h4></div></div>'),
            Row(
                Column('event_type', css_class='form-group col-md-6 mb-3'),
                Column('event_title', css_class='form-group col-md-6 mb-3'),
                css_class='form-row'
            ),
            Row(
                Column('event_date', css_class='form-group col-md-4 mb-3'),
                Column('event_start_time', css_class='form-group col-md-4 mb-3'),
                Column('event_end_time', css_class='form-group col-md-4 mb-3'),
                css_class='form-row'
            ),
            'event_location',
            Row(
                Column('expected_guests', css_class='form-group col-md-6 mb-3'),
                Column('budget_range', css_class='form-group col-md-6 mb-3'),
                css_class='form-row'
            ),
            HTML('<div class="row"><div class="col-12"><h4 class="mb-4 mt-4 text-gold">Service Requirements</h4></div></div>'),
            'service_requested',
            'special_requirements',
            'how_heard_about_us',
            HTML('<div class="text-center mt-4">'),
            Submit('submit', 'Submit Booking Inquiry', css_class='btn btn-primary btn-lg px-5'),
            HTML('</div>')
        )
        
        # Add Bootstrap classes and labels
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'
            if field.required:
                field.widget.attrs['required'] = True


class ContactMessageForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'message']
        widgets = {
            'message': forms.Textarea(attrs={'rows': 5}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Row(
                Column('name', css_class='form-group col-md-6 mb-3'),
                Column('email', css_class='form-group col-md-6 mb-3'),
                css_class='form-row'
            ),
            Row(
                Column('phone', css_class='form-group col-md-6 mb-3'),
                Column('subject', css_class='form-group col-md-6 mb-3'),
                css_class='form-row'
            ),
            'message',
            HTML('<div class="text-center mt-4">'),
            Submit('submit', 'Send Message', css_class='btn btn-primary btn-lg px-5'),
            HTML('</div>')
        )
        
        # Add Bootstrap classes
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'
            if field.required:
                field.widget.attrs['required'] = True