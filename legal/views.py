from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def legal_page(request: HttpRequest, page: str) -> HttpResponse:
    pages = {
        'mentions': {
            'title': 'Mentions légales',
            'description': 'Informations officielles relatives à l’éditeur et à l’utilisation du site de l’UPK.',
        },
        'confidentialite': {
            'title': 'Politique de confidentialité',
            'description': 'Comment l’UPK collecte, utilise et protège les données transmises sur ce site.',
        },
        'conditions': {
            'title': 'Conditions d’utilisation',
            'description': 'Les règles applicables à la consultation et à l’utilisation du site de l’UPK.',
        },
    }
    return render(request, 'legal/legal_page.html', {'page': page, 'page_info': pages[page]})


def mentions(request: HttpRequest) -> HttpResponse:
    return legal_page(request, 'mentions')


def confidentialite(request: HttpRequest) -> HttpResponse:
    return legal_page(request, 'confidentialite')


def conditions(request: HttpRequest) -> HttpResponse:
    return legal_page(request, 'conditions')