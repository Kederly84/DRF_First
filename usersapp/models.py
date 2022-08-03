from django.db import models
from django.contrib.auth.models import AbstractUser

NULLABLE = {
    'blank': True,
    'null': True
}


# Create your models here.

class User(AbstractUser):
    age = models.PositiveSmallIntegerField(verbose_name='Возраст', **NULLABLE)
    email = models.EmailField(unique=True, verbose_name='Email')
    avatar = models.ImageField(upload_to='users', **NULLABLE)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
