from django.shortcuts import render
from django.http import HttpResponse, HttpRequest

# Create your views here.
def adminission(request : HttpRequest) -> HttpResponse:
    return render(request, 'adminission/adminission.html', {})