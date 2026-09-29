from django.shortcuts import render

from .models import Photo


def gallery(request):
    photos = Photo.objects.all()
    return render(request, 'gallery/gallery.html', {'photos': photos})