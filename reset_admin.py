import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jewtread_hr.settings')
import django
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

username = 'admin'
password = 'ChangeThisPassword123!'
email = 'admin@jewtreadhr.com'

user, created = User.objects.get_or_create(username=username, defaults={'email': email})
user.set_password(password)
user.is_superuser = True
user.is_staff = True
if hasattr(user, 'role'):
    user.role = 'ADMIN'
user.save()

print(f"User {'created' if created else 'updated'}: {username}")