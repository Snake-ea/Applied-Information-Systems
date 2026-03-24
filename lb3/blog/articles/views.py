# coding: utf-8
# articles/views.py
from django.shortcuts import render
from .models import Article

def archive(request):
    # Получаем все статьи из базы данных
    posts = Article.objects.all()
    
    # Передаем статьи в контекст шаблона
    return render(request, 'archive.html', {'posts': posts})