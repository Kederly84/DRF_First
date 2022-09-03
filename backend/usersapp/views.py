from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin, UpdateModelMixin, CreateModelMixin, \
    DestroyModelMixin
from .models import User
from .serializers import UserModelSerializer, NewUserModelSerializer
from .filters import UserFilter


# Create your views here.

# class UserModelViewSet(ModelViewSet):
#     serializer_class = UserModelSerializer
#     queryset = User.objects.all()


class UserModelViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin,
                       GenericViewSet):
    """Вьюсет для просмотра списка пользователей и конкретного пользователя.
    есть возможность просмотра списка и каждого пользователя в отдельности,
    можно вносить изменения, нельзя удалять и создавать"""
    # serializer_class = UserModelSerializer
    queryset = User.objects.all()
    filterset_class = UserFilter

    def perform_destroy(self, instance):
        instance.deleted = True
        instance.save()

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return NewUserModelSerializer
        return UserModelSerializer
