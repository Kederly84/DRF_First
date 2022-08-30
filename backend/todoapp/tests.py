from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from todoapp.views import ProjectModelViewSet
from rest_framework import status
from usersapp.models import User
from todoapp.models import Project, Todo
from mixer.backend.django import mixer


class ProjectTestCase(TestCase):

    def test_project_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todo/project/')
        user = User.objects.create_superuser(username='test', password='qwerty')
        force_authenticate(request, user=user)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_project_detail(self):
        project = Project.objects.create(project_name='Tect')
        client = APIClient()
        user = User.objects.create_superuser(username='test', password='qwerty')
        client.login(username='test', password='qwerty')
        response = client.get(f'/api/todo/project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()


class TodoTestCase(APITestCase):

    def setUp(self) -> None:
        self.project = mixer.blend(Project)
        self.note = mixer.blend(Todo)
        self.admin = User.objects.create_superuser('test', 'test@test.com', 'qwerty123')

    def test_edit_project(self):
        self.client.login(username='test', password='qwerty123')
        response = self.client.put(f'/api/todo/project/{self.project.id}/', {'project_name': 'Test 2'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=self.project.id)
        self.assertEqual(project.project_name, 'Test 2')

    def test_edit_note(self):
        self.client.login(username='test', password='qwerty123')
        response = self.client.patch(f'/api/todo/todo/{self.note.id}/',
                                     {'note_text': 'Test 2', 'note_header': 'Testing'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        note = Todo.objects.get(id=self.note.id)
        self.assertEqual(note.note_header, 'Testing')
        self.assertEqual(note.note_text, 'Test 2')
