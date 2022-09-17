from .debug import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'NoteProject',
        'USER': 'Kederly',
        'PASSWORD': 'Qwerty123',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
