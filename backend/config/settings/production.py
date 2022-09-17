from .base import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'notes',
        'USER': 'Kederly',
        'PASSWORD': 'Qwerty123',
        'HOST': 'db',
        'PORT': '5432',
    }
}
