from django.contrib import admin
from unfold.admin import ModelAdmin

from .models import Photo


@admin.register(Photo)
class PhotoAdmin(ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title',)
    list_filter = ('created_at',)