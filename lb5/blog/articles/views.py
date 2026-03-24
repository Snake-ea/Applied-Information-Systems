# coding: utf-8
from django.shortcuts import render, redirect
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

def create_post(request):
    # Проверяем, авторизован ли пользователь
    if not request.user.is_anonymous():
        if request.method == "POST":
            # Обрабатываем данные формы, если метод POST
            form = {
                'text': request.POST.get("text", ""),
                'title': request.POST.get("title", "")
            }
            
            # Проверяем уникальность названия
            if Article.objects.filter(title=form["title"]).exists():
                form['errors'] = u"Статья с таким названием уже существует"
                return render(request, 'create_post.html', {'form': form})
            
            # Проверяем, заполнены ли поля
            if form["text"] and form["title"]:
                # Если поля заполнены без ошибок
                article = Article.objects.create(
                    text=form["text"],
                    title=form["title"],
                    author=request.user
                )
                return redirect('get_article', article_id=article.id)
                # перейти на страницу поста
            else:
                # Если введенные данные некорректны
                form['errors'] = u"Не все поля заполнены"
                return render(request, 'create_post.html', {'form': form})
        else:
            # Просто вернуть страницу с формой, если метод GET
            return render(request, 'create_post.html', {})
    else:
        # Если пользователь не авторизован
        raise Http404("Только авторизованные пользователи могут создавать статьи")