"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_yasg.views import get_schema_view as schema
from drf_yasg import openapi
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

schema_view = schema(
    openapi.Info(
        title="ToDo",
        default_version='1.0',
        description='Documentation for my project',
        contact=openapi.Contact(email='django@django.com'),
        license=openapi.License(name='MIT License'),
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('usersapp.urls', namespace='users')),
    path('api/todo/', include('todoapp.urls', namespace='todo')),
    path('api-auth/', include('rest_framework.urls')),
    path('api-auth-token/', views.obtain_auth_token),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui()),
    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),
    path('openapi', get_schema_view(
        title="My Project",
        description="API",
        version="1.0"
    ), name='openapi-schema'),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
