from django.contrib import admin
from todoapp.models import Project, Todo


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('project_name', 'created', 'deleted')
    list_display_links = ('project_name',)
    list_per_page = 10
    search_fields = ('project_name', 'created', 'deleted')


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('note_header', 'is_active', 'note_project')
    list_display_links = ('note_header',)
    list_per_page = 20
    search_fields = ('note_header', 'created', 'deleted', 'note_project')

