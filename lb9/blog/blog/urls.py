# coding: utf-8
from django.conf.urls import patterns, include, url
from articles import views
from django.contrib import admin
from django.contrib.auth import views as auth_views

# Регистрируем админку
admin.autodiscover()

urlpatterns = patterns('',
    # Страница архива всех статей
    url(r'^archive/$', views.archive, name='archive'),
    
    # Страница одной статьи
    url(r'^article/(?P<article_id>\d+)$', views.get_article, name='get_article'),
    
    # Страница создания новой статьи
    url(r'^article/new/$', views.create_post, name='create_post'),
    
    # НОВЫЕ: Страницы регистрации и авторизации
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
    
    # Админка Django
    url(r'^admin/', include(admin.site.urls)),
)