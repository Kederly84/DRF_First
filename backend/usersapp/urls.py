from usersapp.apps import UsersappConfig
from django.urls import path, include
from usersapp.views import UserModelViewSet
from rest_framework.routers import DefaultRouter
from django.views.generic.base import RedirectView

app_name = UsersappConfig.name
router = DefaultRouter()
router.register('users', UserModelViewSet)

urlpatterns = [
    path('', include(router.urls), name='api'),
]
