"""
URL configuration for University project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name=)
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name=)
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from home.views import index
from about.views import about
from admission.views import admission
from contact.views import contact, send_email
from news.views import news, news_detail
from partnerships.views import partnerships



urlpatterns = [
    path('', index, name='index'),
    path('about/', about, name='about'),
    path('admission/', admission, name='admission'),
    path('admin/', admin.site.urls),
    path('contact/', contact, name='contact'),
    path('contact/send-email/', send_email, name='send_email'),
    path('news/', news, name='news'),
    path('news_detail/<int:pk>/', news_detail, name='news_detail'),
    path('partnerships/', partnerships, name='partnerships'),
    path('faculties/', include('faculties.urls')),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
