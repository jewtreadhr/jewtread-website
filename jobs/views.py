from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from .models import JobPosting, JobCategory

def job_list(request):
    jobs = JobPosting.objects.filter(status='OPEN').order_by('-created_at')
    categories = JobCategory.objects.all()
    query = request.GET.get('q', '').strip()
    if query:
        jobs = jobs.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(category__name__icontains=query)
        )
    return render(request, 'jobs/job-opportunities.html', {'jobs': jobs, 'categories': categories, 'query': query})

from django.contrib import messages
from django.shortcuts import redirect
from .models import Application

def job_detail(request, pk):
    job = get_object_or_404(JobPosting, pk=pk)
    
    if request.method == 'POST':
        # Ensure user is authenticated to apply
        if not request.user.is_authenticated:
            return redirect('users:upload_cv')
            
        if request.user.role != 'JOB_SEEKER':
            messages.error(request, "Only job seekers can apply for roles.")
            return redirect('jobs:detail', pk=pk)
            
        # Check if they have a CV
        profile = getattr(request.user, 'job_seeker_profile', None)
        if not profile or not profile.cv_file:
            messages.warning(request, "You must upload a Master CV to your profile before you can apply.")
            return redirect('users:upload_cv')
            
        # Create application if it doesn't exist
        application, created = Application.objects.get_or_create(
            applicant=request.user,
            job=job,
            defaults={'status': 'PENDING'}
        )
        if created:
            messages.success(request, f"You have successfully applied for {job.title}!")
        else:
            messages.info(request, f"You have already applied for {job.title}.")
            
        return redirect('users:upload_cv')
            
    return render(request, 'jobs/job-details.html', {'job': job})
