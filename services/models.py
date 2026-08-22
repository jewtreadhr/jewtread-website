from django.db import models
from django.conf import settings

class ServiceRequest(models.Model):
    # New intake fields
    staff_category = models.CharField(max_length=255, default='Domestic Staffing')
    service_type = models.CharField(max_length=255, verbose_name="Role Needed")
    num_hires = models.CharField(max_length=50, blank=True, null=True)
    work_arrangement = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    timeline = models.CharField(max_length=100, blank=True, null=True)
    
    # Client info
    client_name = models.CharField(max_length=255, blank=True, null=True)
    organization_name = models.CharField(max_length=255, blank=True, null=True)
    client_email = models.EmailField(blank=True, null=True)
    client_phone = models.CharField(max_length=20, blank=True, null=True)
    
    # Details & old fields
    details = models.TextField(blank=True, null=True)
    budget_range = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.service_type} for {self.client_name or 'Unknown Client'}"
