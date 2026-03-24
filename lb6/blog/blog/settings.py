# coding: utf-8
import os
import sys
import mimetypes

# ============================================
# ФИКС ПРОБЛЕМЫ С РЕЕСТРОМ WINDOWS
# ============================================
reload(sys)
sys.setdefaultencoding('utf-8')

# Отключаем чтение реестра Windows для mimetypes
import mimetypes
mimetypes._winreg = None  # Отключаем реестр

# Теперь добавляем типы вручную
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/png', '.png')
mimetypes.add_type('image/jpeg', '.jpg')
mimetypes.add_type('image/jpeg', '.jpeg')
mimetypes.add_type('text/javascript', '.js')
# ============================================

# Путь к проекту
PROJECT_PATH = os.path.dirname(os.path.abspath(__file__))

# Пути к папкам статических файлов
STATIC_ROOT_DIR = os.path.join(PROJECT_PATH, 'static')
CSS_DIR = os.path.join(STATIC_ROOT_DIR, 'css')
IMG_DIR = os.path.join(STATIC_ROOT_DIR, 'img')

# Создаем папки, если их нет
try:
    if not os.path.exists(STATIC_ROOT_DIR):
        os.makedirs(STATIC_ROOT_DIR)
        

    if not os.path.exists(CSS_DIR):
        os.makedirs(CSS_DIR)
        

    if not os.path.exists(IMG_DIR):
        os.makedirs(IMG_DIR)
       

except Exception as e:
    print()

DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db_helloworld',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}

ALLOWED_HOSTS = []

TIME_ZONE = 'Europe/Moscow'

LANGUAGE_CODE = 'ru-RU'

SITE_ID = 1

USE_I18N = True
USE_L10N = True
USE_TZ = True

# Статические файлы (CSS, JS, изображения)
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    STATIC_ROOT_DIR,
)

# Для загрузки медиа-файлов
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(PROJECT_PATH, 'media')

# Создаем папку для медиа, если её нет
if not os.path.exists(MEDIA_ROOT):
    os.makedirs(MEDIA_ROOT)


# Absolute path to the directory static files should be collected to
STATIC_ROOT = ''

# Template settings
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

TEMPLATE_DIRS = (
    os.path.join(PROJECT_PATH, 'templates'),
)

# Создаем папку для шаблонов, если её нет
if not os.path.exists(TEMPLATE_DIRS[0]):
    os.makedirs(TEMPLATE_DIRS[0])


# Контекстные процессоры для шаблонов
TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    'django.core.context_processors.request',
    'django.contrib.messages.context_processors.messages',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
)

ROOT_URLCONF = 'blog.urls'

WSGI_APPLICATION = 'blog.wsgi.application'

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    'articles',
)

# Secret key
SECRET_KEY = 'w#sj1ydzplu91dux!m-cn@alrbw%^au#dr45*(0tp!^n#71i=g'

# Static files finders
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}