from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from news.models import News

# Create your views here.
def  index(request: HttpRequest) -> HttpResponse:
    news_items = News.objects.all().order_by('-published_date')[:3]  # Affiche uniquement les 3 dernières actualités
    return render(request, 'home/index.html', {'news_items': news_items})