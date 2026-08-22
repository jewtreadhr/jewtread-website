from django import forms
from .models import TalentPoolCandidate

class TalentPoolCandidateForm(forms.ModelForm):
    class Meta:
        model = TalentPoolCandidate
        fields = ['full_name', 'email', 'phone', 'bio', 'skills', 'cv_file']
        widgets = {
            'bio': forms.Textarea(attrs={'class': 'portal-form-textarea', 'rows': 4, 'placeholder': 'Tell us about your experience and career goals...'}),
            'skills': forms.TextInput(attrs={'class': 'portal-form-input', 'placeholder': 'e.g. Communication, Data Analysis, Leadership'}),
        }
