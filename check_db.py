import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jewtread_hr.settings')
import django
django.setup()

from django.conf import settings
print(settings.DATABASES['default']['ENGINE'])
print(settings.DATABASES['default'].get('NAME'))