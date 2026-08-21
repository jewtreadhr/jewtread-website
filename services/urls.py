from django.urls import path
from . import views

app_name = 'services'

urlpatterns = [
    path('hire/', views.hire_professional, name='hire'),
]
