from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ServiceRequest

def hire_professional(request):
    if request.method == 'POST':
        service_type = request.POST.get('service_type')
        details = request.POST.get('details')
        budget_range = request.POST.get('budget_range', '')
        
        client = request.user if request.user.is_authenticated else None
        
        ServiceRequest.objects.create(
            client=client,
            service_type=service_type,
            details=details,
            budget_range=budget_range
        )
        
        messages.success(request, 'Your service request has been submitted successfully.')
        return redirect('services:hire')
        
    return render(request, 'services/hire-a-professional.html')
