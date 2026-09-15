from django.shortcuts import render
from django.http import HttpResponse, HttpRequest

# Create your views here.
def contact(request : HttpRequest) -> HttpResponse:
    return render(request, 'contact/contact.html', {})