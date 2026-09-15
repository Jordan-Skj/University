from django.shortcuts import render
from django.http import HttpResponse, HttpRequest

# Create your views here.
def about(request : HttpRequest) -> HttpResponse:
    return render(request, 'about/about.html', {})