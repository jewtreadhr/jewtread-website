"""
URL configuration for jewtread_hr project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

urlpatterns = [
    path('jewtread-secure-admin/', admin.site.urls),  # Secret admin URL
    path('admin/', lambda request: redirect('core:index')),  # Honeypot/redirect for public 'admin' access
    path('admin-portal-secure/', include('portal.urls')),
    path('jobs/', include('jobs.urls')),
    path('services/', include('services.urls')),
    path('', include('users.urls')),
    path('', include('core.urls')),
]
