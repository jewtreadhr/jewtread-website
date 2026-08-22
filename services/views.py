from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ServiceRequest

def hire_professional(request):
    if request.method == 'POST':
        ServiceRequest.objects.create(
            staff_category=request.POST.get('staffCategory', ''),
            service_type=request.POST.get('service_type', ''),
            num_hires=request.POST.get('numHires', ''),
            work_arrangement=request.POST.get('workArrangement', ''),
            location=request.POST.get('placementLocation', ''),
            timeline=request.POST.get('targetStartDate', ''),
            client_name=request.POST.get('clientName', ''),
            organization_name=request.POST.get('organizationName', ''),
            client_email=request.POST.get('clientEmail', ''),
            client_phone=request.POST.get('clientPhone', ''),
            details=request.POST.get('details', '')
        )
        
        messages.success(request, 'Your service request has been submitted successfully.')
        return redirect('services:hire')
        
    return render(request, 'services/hire-a-professional.html')
