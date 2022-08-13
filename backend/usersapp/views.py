from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin, CreateModelMixin, \
    DestroyModelMixin
from .models import User
from .serializers import UserModelSerializer
from .filters import UserFilter
from django_filters import rest_framework as filters


# Create your views here.

# class UserModelViewSet(ModelViewSet):
#     serializer_class = UserModelSerializer
#     queryset = User.objects.all()


class UserModelViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin,
                       GenericViewSet):
    """Вьюсет для просмотра списка пользователей и конкретного пользователя.
    есть возможность просмотра списка и каждого пользователя в отдельности,
    можно вносить изменения, нельзя удалять и создавать"""
    serializer_class = UserModelSerializer
    queryset = User.objects.all()
    filterset_class = UserFilter

    def perform_destroy(self, instance):
        instance.deleted = True
        instance.save()
