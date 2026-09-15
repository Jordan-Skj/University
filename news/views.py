from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from .models import News

# Create your views here.
def news(request : HttpRequest) -> HttpResponse:
    news_items = News.objects.all().order_by('-published_date')
    return render(request, 'news/news.html', {'news_items': news_items})