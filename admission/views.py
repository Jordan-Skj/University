from django.shortcuts import render
from django.http import HttpResponse, HttpRequest

# Create your views here.
def admission(request : HttpRequest) -> HttpResponse:
    return render(request, 'admission/admission.html', {})