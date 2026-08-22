from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('JOB_SEEKER', 'Job Seeker'),
        ('ADMIN', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='JOB_SEEKER')

class TalentPoolCandidate(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    bio = models.TextField(blank=True, help_text="Short Introduction")
    skills = models.CharField(max_length=255, blank=True, help_text="Comma separated skills")
    cv_file = models.FileField(upload_to='private_media/cvs/')
    created_at = models.DateTimeField(auto_now_add=True)
    is_reviewed = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name
