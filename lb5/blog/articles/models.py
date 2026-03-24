# coding: utf-8
from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    title = models.CharField(max_length=200, unique=True)  # Добавлен unique=True
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

    def get_excerpt(self):
        return self.text[:200] + '...' if len(self.text) > 200 else self.text