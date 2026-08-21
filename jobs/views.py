from django.shortcuts import render, get_object_or_404
from .models import JobPosting, JobCategory

def job_list(request):
    jobs = JobPosting.objects.filter(status='OPEN').order_by('-created_at')
    return render(request, 'jobs/job-opportunities.html', {'jobs': jobs})

def job_detail(request, pk):
    job = get_object_or_404(JobPosting, pk=pk)
    
    if request.method == 'POST':
        # Ensure user is authenticated to apply
        if not request.user.is_authenticated:
            # You might want to redirect to login or show an error
            pass 
        else:
            # Handle application creation
            cover_letter = request.POST.get('cover_letter', '')
            # Create application if it doesn't exist
            application, created = Application.objects.get_or_create(
                applicant=request.user,
                job=job,
                defaults={'status': 'PENDING'}
            )
            # In a real app you'd save cover letter to a model field if it exists
            
    return render(request, 'jobs/job-details.html', {'job': job})
