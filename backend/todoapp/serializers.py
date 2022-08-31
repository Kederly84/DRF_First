from rest_framework.serializers import ModelSerializer, Serializer, CharField
from .models import Project, Todo
from usersapp.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    project_users = UserModelSerializer(many=False)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelBaseSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    note_project = ProjectModelSerializer(many=False)
    note_user = UserModelSerializer(many=False)

    class Meta:
        model = Todo
        fields = '__all__'


class ToDoModelBaseSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
