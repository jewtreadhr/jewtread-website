from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, Http404, HttpResponseForbidden
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from .models import JobSeekerProfile
from .forms import JobSeekerSignUpForm, EmployerSignUpForm
import os
from django.conf import settings

def signup_jobseeker(request):
    if request.method == 'POST':
        form = JobSeekerSignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('core:home') # we'll define this later
    else:
        form = JobSeekerSignUpForm()
    return render(request, 'users/signup.html', {'form': form, 'user_type': 'jobseeker'})

def signup_employer(request):
    if request.method == 'POST':
        form = EmployerSignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('core:home')
    else:
        form = EmployerSignUpForm()
    return render(request, 'users/signup.html', {'form': form, 'user_type': 'employer'})

@login_required
def employer_dashboard(request):
    if request.user.role != 'EMPLOYER':
        return redirect('users:jobseeker_dashboard')
    
    jobs = request.user.job_postings.all()
    # In a real app we'd get real stats
    stats = {
        'active_jobs': jobs.filter(status='OPEN').count(),
        'total_applications': Application.objects.filter(job__employer=request.user).count()
    }
    return render(request, 'users/dashboard.html', {'jobs': jobs, 'stats': stats})

@login_required
def jobseeker_dashboard(request):
    if request.user.role != 'JOB_SEEKER':
        return redirect('users:employer_dashboard')
        
    applications = request.user.applications.all()
    return render(request, 'users/job-seeker-dashboard.html', {'applications': applications})

@login_required
def profile_cv(request):
    if request.user.role == 'JOB_SEEKER':
        profile, created = JobSeekerProfile.objects.get_or_create(user=request.user)
    elif request.user.role == 'EMPLOYER':
        profile, created = EmployerProfile.objects.get_or_create(user=request.user)
    else:
        profile = None
    
    return render(request, 'users/profile-cv.html', {'profile': profile})

@login_required
def download_cv(request, profile_id):
    profile = get_object_or_404(JobSeekerProfile, id=profile_id)
    
    # Security Check: Only the owner or an employer/admin can download
    if request.user != profile.user and request.user.role not in ['EMPLOYER', 'ADMIN']:
        return HttpResponseForbidden("You do not have permission to view this CV.")
    
    if not profile.cv_file:
        raise Http404("CV not found.")
        
    file_path = profile.cv_file.path
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/pdf")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
    raise Http404("File does not exist on server.")
