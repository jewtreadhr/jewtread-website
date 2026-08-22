from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, Http404, HttpResponseForbidden
from django.contrib import messages
import os
from .models import TalentPoolCandidate
from .forms import TalentPoolCandidateForm
from portal.views import admin_required

def upload_cv(request):
    """Public page for anyone to upload their CV into the talent pool."""
    if request.method == 'POST':
        form = TalentPoolCandidateForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your CV has been successfully uploaded to our talent pool. Thank you!')
            return redirect('users:upload_cv')
    else:
        form = TalentPoolCandidateForm()
    
    return render(request, 'users/profile-cv.html', {'form': form})


@admin_required
def download_cv(request, candidate_id):
    """Admin-only view to download an uploaded CV."""
    candidate = get_object_or_404(TalentPoolCandidate, id=candidate_id)
    
    if not candidate.cv_file:
        raise Http404("CV not found.")
        
    file_path = candidate.cv_file.path
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/pdf")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
    raise Http404("File does not exist on server.")


def login_redirect(request):
    return redirect('portal:login')


def signup_jobseeker_redirect(request):
    return redirect('users:upload_cv')


def signup_employer_redirect(request):
    return redirect('services:hire')


def jobseeker_dashboard_redirect(request):
    return redirect('users:upload_cv')


def employer_dashboard_redirect(request):
    return redirect('portal:dashboard')


def profile_redirect(request):
    return redirect('users:upload_cv')


def logout_view(request):
    from django.contrib.auth import logout
    logout(request)
    return redirect('core:index')