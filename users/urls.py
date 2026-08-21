from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from . import views

app_name = 'users'

urlpatterns = [
    path('signup/jobseeker/', views.signup_jobseeker, name='signup_jobseeker'),
    path('signup/employer/', views.signup_employer, name='signup_employer'),
    path('login/', LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
    path('employer-dashboard/', views.employer_dashboard, name='employer_dashboard'),
    path('dashboard/', views.jobseeker_dashboard, name='jobseeker_dashboard'),
    path('profile/', views.profile_cv, name='profile'),
    path('cv/<int:profile_id>/', views.download_cv, name='download_cv'),
]
