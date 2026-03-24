# coding: utf-8
from django.conf.urls import patterns, include, url
from articles import views
from django.contrib import admin

# Регистрируем админку
admin.autodiscover()

urlpatterns = patterns('',
    # Страница архива всех статей
    url(r'^archive/$', views.archive, name='archive'),
    
    # Страница одной статьи
    url(r'^article/(?P<article_id>\d+)$', views.get_article, name='get_article'),
    
    # Админка Django
    url(r'^admin/', include(admin.site.urls)),
)