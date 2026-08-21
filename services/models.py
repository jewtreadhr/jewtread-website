from django.db import models
from django.conf import settings

class ServiceRequest(models.Model):
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    service_type = models.CharField(max_length=255)
    details = models.TextField()
    budget_range = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Service Request for {self.service_type}"
