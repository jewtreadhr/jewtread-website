import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jewtread_hr.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

# Check if an admin exists
admin_user = User.objects.filter(is_superuser=True).first()

if not admin_user:
    # Create a new admin
    print("Creating new admin user: admin / admin123")
    admin_user = User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    admin_user.role = 'ADMIN'
    admin_user.save()
else:
    # Reset existing admin password
    print(f"Resetting password for existing admin: {admin_user.username}")
    admin_user.set_password('admin123')
    admin_user.save()
    print(f"Username: {admin_user.username} / Password: admin123")
