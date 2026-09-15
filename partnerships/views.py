from django.shortcuts import render
from django.http import HttpResponse, HttpRequest

# Create your views here.
def partnerships(request : HttpRequest) -> HttpResponse:
    return render(request, 'partnerships/partnerships.html', {})