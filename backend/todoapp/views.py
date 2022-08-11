from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo
from .serializers import ProjectModelSerializer, ToDoModelSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse


class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()


class TodoModelViewSet(ModelViewSet):
    serializer_class = ToDoModelSerializer
    queryset = Todo.objects.all()
