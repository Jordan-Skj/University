from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import News

# Register your models here.
@admin.register(News)
class NewsAdmin(ModelAdmin):
    list_display = ('title', 'published_date')
    search_fields = ('title', 'content')
    list_filter = ('published_date',)