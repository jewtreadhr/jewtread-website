from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, JobSeekerProfile, EmployerProfile

class JobSeekerSignUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.role = 'JOB_SEEKER'
        if commit:
            user.save()
            JobSeekerProfile.objects.create(user=user)
        return user

class EmployerSignUpForm(UserCreationForm):
    company_name = forms.CharField(max_length=255, required=True)
    industry = forms.CharField(max_length=100, required=False)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.role = 'EMPLOYER'
        if commit:
            user.save()
            EmployerProfile.objects.create(
                user=user, 
                company_name=self.cleaned_data.get('company_name'),
                industry=self.cleaned_data.get('industry', '')
            )
        return user
