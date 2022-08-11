from todoapp.apps import TodoappConfig
from django.urls import path, include
from todoapp.views import ProjectModelViewSet, TodoModelViewSet
from rest_framework.routers import DefaultRouter

app_name = TodoappConfig.name
router = DefaultRouter()
router.register('project', ProjectModelViewSet)
router.register('todo', TodoModelViewSet)

urlpatterns = [
    path('', include(router.urls), name='api'),
]
