from django.shortcuts import render, get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Project, Todo
from .serializers import ProjectModelSerializer, ToDoModelSerializer
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse
from .filters import ProjectFilter, TodoFilter
from rest_framework.pagination import LimitOffsetPagination


class ProjectOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
    filterset_class = ProjectFilter
    pagination_class = ProjectOffsetPagination

    @action(detail=True, methods=['get'])
    def get_project_name(self, request, pk):
        project_name = get_object_or_404(Project, pk=pk)
        return Response({'project_name': str(project_name.project_name)})

    def perform_destroy(self, instance):
        instance.deleted = True
        instance.save()


class TodoModelViewSet(ModelViewSet):
    serializer_class = ToDoModelSerializer
    queryset = Todo.objects.all()
    filterset_class = TodoFilter
    pagination_class = TodoOffsetPagination

    def perform_destroy(self, instance):
        instance.deleted = True
        instance.save()
