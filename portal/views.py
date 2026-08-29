from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import HttpResponseForbidden
from functools import wraps
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from .forms import ProfileUpdateForm
from django.utils.http import url_has_allowed_host_and_scheme

from users.models import TalentPoolCandidate
from services.models import ServiceRequest

def admin_required(view_func):
    """Decorator that ensures only ADMIN role users can access portal views."""
    @wraps(view_func)
    @login_required(login_url='portal:login')
    def wrapper(request, *args, **kwargs):
        if request.user.role != 'ADMIN' and not request.user.is_superuser:
            messages.error(request, 'You do not have access to the admin portal.')
            return redirect('portal:login')
        return view_func(request, *args, **kwargs)
    return wrapper


# ==========================================
# AUTH
# ==========================================
# def portal_login(request):
#     if request.user.is_authenticated and (request.user.role == 'ADMIN' or request.user.is_superuser):
#         return redirect('portal:dashboard')

#     if request.method == 'POST':
#         username = request.POST.get('username', '').strip()
#         password = request.POST.get('password', '')
#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             if user.role != 'ADMIN' and not user.is_superuser:
#                 messages.error(request, 'Only admin accounts can access the portal.')
#             else:
#                 login(request, user)
#                 next_url = request.GET.get('next', 'portal:dashboard')
#                 return redirect(next_url)
#         else:
#             messages.error(request, 'Invalid username or password.')

#     return render(request, 'portal/login.html')

def portal_login(request):
    if request.user.is_authenticated and (request.user.role == 'ADMIN' or request.user.is_superuser):
        return redirect('portal:dashboard')

    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            if user.role != 'ADMIN' and not user.is_superuser:
                messages.error(request, 'Only admin accounts can access the portal.')
            else:
                login(request, user)

                next_url = request.GET.get('next')
                if next_url and url_has_allowed_host_and_scheme(
                    next_url, allowed_hosts={request.get_host()}, require_https=request.is_secure()
                ):
                    return redirect(next_url)
                return redirect('portal:dashboard')
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'portal/login.html')

@login_required(login_url='portal:login')
def portal_logout(request):
    logout(request)
    messages.success(request, 'You have been logged out.')
    return redirect('portal:login')


# ==========================================
# DASHBOARD
# ==========================================
@admin_required
def dashboard(request):
    cvs = TalentPoolCandidate.objects.all()
    requests = ServiceRequest.objects.all()

    stats = {
        'total_cvs': cvs.count(),
        'pending_cvs': cvs.filter(is_reviewed=False).count(),
        'total_requests': requests.count(),
    }

    recent_cvs = cvs.order_by('-created_at')[:5]
    recent_requests = requests.order_by('-created_at')[:5]

    return render(request, 'portal/dashboard.html', {
        'stats': stats,
        'recent_cvs': recent_cvs,
        'recent_requests': recent_requests,
        'active_page': 'dashboard',
    })


# ==========================================
# TALENT POOL
# ==========================================
@admin_required
def talent_pool_list(request):
    cvs = TalentPoolCandidate.objects.all().order_by('-created_at')

    # Search
    q = request.GET.get('q', '').strip()
    if q:
        cvs = cvs.filter(full_name__icontains=q) | cvs.filter(skills__icontains=q)

    # Filter
    status = request.GET.get('status', '')
    if status == 'REVIEWED':
        cvs = cvs.filter(is_reviewed=True)
    elif status == 'PENDING':
        cvs = cvs.filter(is_reviewed=False)

    return render(request, 'portal/talent_pool/list.html', {
        'cvs': cvs,
        'search_query': q,
        'status_filter': status,
        'active_page': 'talent_pool',
    })

@admin_required
def talent_pool_detail(request, pk):
    cv = get_object_or_404(TalentPoolCandidate, pk=pk)
    return render(request, 'portal/talent_pool/detail.html', {
        'cv': cv,
        'active_page': 'talent_pool',
    })

@admin_required
def talent_pool_update_status(request, pk):
    if request.method == 'POST':
        cv = get_object_or_404(TalentPoolCandidate, pk=pk)
        action = request.POST.get('action', '')
        if action == 'mark_reviewed':
            cv.is_reviewed = True
        elif action == 'mark_pending':
            cv.is_reviewed = False
        cv.save()
        messages.success(request, 'CV status updated successfully.')
    return redirect('portal:talent_pool_detail', pk=pk)


# ==========================================
# SERVICE REQUESTS
# ==========================================
@admin_required
def service_request_list(request):
    requests = ServiceRequest.objects.all().order_by('-created_at')
    
    # Search
    q = request.GET.get('q', '').strip()
    if q:
        requests = requests.filter(client_name__icontains=q) | requests.filter(service_type__icontains=q) | requests.filter(organization_name__icontains=q)

    return render(request, 'portal/service_requests/list.html', {
        'service_requests': requests,
        'search_query': q,
        'active_page': 'service_requests',
    })


# ==========================================
# PROFILE
# ==========================================
@admin_required
def profile_settings(request):
    password_form = PasswordChangeForm(request.user)
    profile_form = ProfileUpdateForm(instance=request.user)

    if request.method == 'POST':
        if 'update_profile' in request.POST:
            profile_form = ProfileUpdateForm(request.POST, instance=request.user)
            if profile_form.is_valid():
                profile_form.save()
                messages.success(request, 'Profile updated successfully.')
                return redirect('portal:profile')
            else:
                messages.error(request, 'Please correct the errors below.')

        elif 'change_password' in request.POST:
            password_form = PasswordChangeForm(request.user, request.POST)
            if password_form.is_valid():
                user = password_form.save()
                update_session_auth_hash(request, user)
                messages.success(request, 'Password updated successfully.')
                return redirect('portal:profile')
            else:
                messages.error(request, 'Please correct the errors in the password form.')

    return render(request, 'portal/profile.html', {
        'password_form': password_form,
        'profile_form': profile_form,
        'active_page': 'profile',
    })
