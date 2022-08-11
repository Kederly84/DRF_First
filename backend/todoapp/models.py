from django.db import models
from django.contrib.auth import get_user_model

NULLABLE = {
    'blank': True,
    'null': True
}


class BaseModel(models.Model):
    created = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated = models.DateTimeField(auto_now_add=True, verbose_name='Обновлено')
    deleted = models.BooleanField(default=False, verbose_name='Удалено')

    class Meta:
        abstract = True

    def delete(self, *args, **kwargs):
        self.deleted = True
        self.save()


class Project(BaseModel):
    project_name = models.CharField(max_length=124, verbose_name='Имя проекта')
    description = models.CharField(max_length=255, verbose_name='Описание проекта', **NULLABLE)
    project_url = models.URLField(max_length=255, verbose_name='Адрес проекта', **NULLABLE)
    project_users = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True,
                                      verbose_name='Пользователи')

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'
        ordering = ['-created', 'project_name']


class Todo(BaseModel):
    note_header = models.CharField(max_length=64, verbose_name='Заголовок заметки', null=True)
    note_text = models.CharField(max_length=255, verbose_name='Текст заметки')
    is_active = models.BooleanField(default=True, verbose_name='Активность заметки')
    note_user = models.OneToOneField(get_user_model(), on_delete=models.SET_NULL, null=True,
                                     verbose_name='Автор заметки')
    note_project = models.OneToOneField(Project, on_delete=models.CASCADE, verbose_name='Проект заметки')

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
