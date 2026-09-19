from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpRequest
from .models import News

# Create your views here.
def news(request : HttpRequest) -> HttpResponse:
    news_items = News.objects.all().order_by('-published_date')
    return render(request, 'news/news.html', {'news_items': news_items})

def news_detail(request : HttpRequest, pk) -> HttpResponse:
    news_item = get_object_or_404(News, pk=pk)

    return render(request, 'news/news_detail.html', {'news_item' : news_item})