from django.contrib import admin
from .models import JobCategory, JobPosting, Application

admin.site.register(JobCategory)
admin.site.register(JobPosting)
admin.site.register(Application)
