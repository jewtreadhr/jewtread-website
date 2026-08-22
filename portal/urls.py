from django.urls import path
from . import views

app_name = 'portal'

urlpatterns = [
    # Auth
    path('login/', views.portal_login, name='login'),
    path('logout/', views.portal_logout, name='logout'),

    # Dashboard
    path('', views.dashboard, name='dashboard'),

    # Talent Pool
    path('talent-pool/', views.talent_pool_list, name='talent_pool_list'),
    path('talent-pool/<int:pk>/', views.talent_pool_detail, name='talent_pool_detail'),
    path('talent-pool/<int:pk>/update-status/', views.talent_pool_update_status, name='talent_pool_update_status'),

    # Service / Staffing Requests
    path('service-requests/', views.service_request_list, name='service_request_list'),

    # Profile
    path('profile/', views.profile_settings, name='profile'),
]
