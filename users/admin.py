from django.contrib import admin
from .models import User, TalentPoolCandidate

admin.site.register(User)

@admin.register(TalentPoolCandidate)
class TalentPoolCandidateAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'created_at', 'is_reviewed')
    list_filter = ('is_reviewed',)
    search_fields = ('full_name', 'email', 'skills')
