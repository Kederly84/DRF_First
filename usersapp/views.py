from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer


# Create your views here.

class UserModelViewSet(ModelViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()

