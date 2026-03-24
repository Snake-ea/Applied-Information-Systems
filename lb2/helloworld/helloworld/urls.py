# coding: utf-8
from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from flatpages.views import home

admin.autodiscover()

urlpatterns = [
    url(r'^$', home, name='home'),
    url(r'^admin/', admin.site.urls),
    url(r'^hello/$', home, name='hello'),
]
