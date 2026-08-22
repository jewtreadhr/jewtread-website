from django.shortcuts import render

def index(request):
    return render(request, 'core/index.html')

def about(request):
    return render(request, 'core/about.html')

def services_page(request):
    return render(request, 'core/services.html')

def contact(request):
    return render(request, 'core/contact.html')

def privacy(request):
    return render(request, 'core/privacy-policy.html')

def terms(request):
    return render(request, 'core/terms.html')
