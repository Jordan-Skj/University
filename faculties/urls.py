from django.urls import path
from .views import (
    index,
    medicine,
    agronomy,
    law,
    theology,
    economics,
    science_and_technology,
    social_sciences,
    psychology
)

app_name = 'faculties'

urlpatterns = [
    path('', index, name='index'),
    path('medicine/', medicine, name='medicine'),
    path('agronomy/', agronomy, name='agronomy'),
    path('law/', law, name='law'),
    path('theology/', theology, name='theology'),
    path('economics/', economics, name='economics'),
    path('science_and_technology/', science_and_technology, name='science_and_technology'),
    path('social_sciences/', social_sciences, name='social_sciences'),
    path('psychology/', psychology, name='psychology'),
]