from django import forms
from django.contrib.auth import get_user_model

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ['username', 'first_name', 'last_name', 'email']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'portal-form-input'}),
            'first_name': forms.TextInput(attrs={'class': 'portal-form-input'}),
            'last_name': forms.TextInput(attrs={'class': 'portal-form-input'}),
            'email': forms.EmailInput(attrs={'class': 'portal-form-input'}),
        }