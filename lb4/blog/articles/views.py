# coding: utf-8
from django.shortcuts import render
from django.http import Http404
from .models import Article

def archive(request):
    posts = Article.objects.all()  # Получаем все статьи
    return render(request, 'archive.html', {'posts': posts})

def get_article(request, article_id):
    try:
        post = Article.objects.get(id=article_id)  # Получаем статью по ID
        return render(request, 'article.html', {'post': post})
    except Article.DoesNotExist:
        raise Http404  # Если статья не найдена, возвращаем ошибку 404