from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('login/', views.login_redirect, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('signup/', views.signup_jobseeker_redirect, name='signup_jobseeker'),
    path('signup/employer/', views.signup_employer_redirect, name='signup_employer'),
    path('dashboard/', views.jobseeker_dashboard_redirect, name='jobseeker_dashboard'),
    path('employer-dashboard/', views.employer_dashboard_redirect, name='employer_dashboard'),
    path('profile/', views.profile_redirect, name='profile'),
    path('upload-cv/', views.upload_cv, name='upload_cv'),
    path('cv/<int:candidate_id>/', views.download_cv, name='download_cv'),
]