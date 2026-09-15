from django.shortcuts import render
from django.http import HttpResponse, HttpRequest

# Create your views here.
def index(request : HttpRequest) -> HttpResponse:
    return render(request, 'faculties/faculties.html', {})

def medicine(request : HttpRequest) -> HttpResponse:
    return render(request, 'faculties/medicine.html', {})

def agronomy(request : HttpRequest) -> HttpResponse:
    return render(request, 'faculties/agronomy.html', {})

def law(request : HttpRequest) -> HttpResponse:
    return render(request, 'faculties/law.html', {})

def theology(request : HttpRequest) -> HttpResponse:
    return render(request, 'faculties/theology.html', {})

def economics(request : HttpRequest) -> HttpResponse:
    return render(request, 'faculties/economics.html', {})

def science_and_technology(request : HttpRequest) -> HttpResponse:
    return render(request, 'faculties/science-and-technology.html', {})

def social_sciences(request : HttpRequest) -> HttpResponse:
    return render(request, 'faculties/social-sciences.html', {})

def psychology(request : HttpRequest) -> HttpResponse:
    return render(request, 'faculties/psychology.html', {})