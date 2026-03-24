# coding: utf-8
from django.shortcuts import render, redirect
from django.http import Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
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

# НОВАЯ ФУНКЦИЯ: Регистрация пользователя
def register(request):
    if request.method == "POST":
        # Получаем данные из формы
        form = {
            'username': request.POST.get("username", ""),
            'email': request.POST.get("email", ""),
            'password': request.POST.get("password", ""),
            'password_confirm': request.POST.get("password_confirm", "")
        }
        
        # Проверяем, что все поля заполнены
        if form["username"] and form["email"] and form["password"] and form["password_confirm"]:
            # Проверяем, совпадают ли пароли
            if form["password"] != form["password_confirm"]:
                form['errors'] = u"Пароли не совпадают"
                return render(request, 'register.html', {'form': form})
            
            # Проверяем уникальность username
            try:
                User.objects.get(username=form["username"])
                # Если пользователь существует
                form['errors'] = u"Пользователь с таким именем уже существует"
                return render(request, 'register.html', {'form': form})
            except User.DoesNotExist:
                # Проверяем уникальность email
                try:
                    User.objects.get(email=form["email"])
                    form['errors'] = u"Пользователь с таким email уже существует"
                    return render(request, 'register.html', {'form': form})
                except User.DoesNotExist:
                    # Создаем нового пользователя
                    User.objects.create_user(
                        username=form["username"],
                        email=form["email"],
                        password=form["password"]
                    )
                    # Автоматически авторизуем пользователя после регистрации
                    user = authenticate(username=form["username"], password=form["password"])
                    if user is not None:
                        login(request, user)
                    return redirect('archive')
        else:
            form['errors'] = u"Не все поля заполнены"
            return render(request, 'register.html', {'form': form})
    else:
        # Если метод GET, просто показываем форму
        return render(request, 'register.html', {})

# НОВАЯ ФУНКЦИЯ: Авторизация пользователя
def user_login(request):
    if request.method == "POST":
        # Получаем данные из формы
        form = {
            'username': request.POST.get("username", ""),
            'password': request.POST.get("password", "")
        }
        
        # Проверяем, что поля заполнены
        if form["username"] and form["password"]:
            # Пробуем аутентифицировать пользователя
            user = authenticate(username=form["username"], password=form["password"])
            if user is not None:
                # Если пользователь существует и пароль верный
                login(request, user)
                # Перенаправляем на страницу, с которой пришел пользователь, или на архив
                next_page = request.GET.get('next', 'archive')
                return redirect(next_page)
            else:
                # Если аутентификация не удалась
                form['errors'] = u"Неверное имя пользователя или пароль"
                return render(request, 'login.html', {'form': form})
        else:
            form['errors'] = u"Не все поля заполнены"
            return render(request, 'login.html', {'form': form})
    else:
        # Если метод GET, просто показываем форму
        return render(request, 'login.html', {})

# НОВАЯ ФУНКЦИЯ: Выход пользователя
def user_logout(request):
    logout(request)
    return redirect('archive')