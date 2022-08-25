from django.contrib import admin
from usersapp.models import User
from django.contrib.auth.admin import UserAdmin


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'first_name', 'last_name', 'age', 'is_staff', 'is_active')
    list_per_page = 10
    list_filter = ('username', 'is_staff', 'is_active')
    search_fields = ('username', 'first_name', 'last_name')
