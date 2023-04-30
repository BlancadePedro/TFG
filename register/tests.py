from django.test import TestCase
import pytest
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import Profile

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode


# Configurar pytest-django
pytestmark = pytest.mark.django_db

def test_login(client):
    # Crear un usuario de prueba
    user = Profile.objects.create_user(username='testuser', password='testpassword')

    # Log in
    response = client.post(reverse('login'), {'username': 'testuser', 'password': 'testpassword'})

    assert response.status_code == 302  # Redirigido a la página de inicio
    assert user.is_authenticated

def test_register(client):
    # Registrar un nuevo usuario
    response = client.post(reverse('register'), {
        'username': 'new_user',
        'first_name': 'new_first_name',
        'last_name': 'new_last_name',
        'email': 'new_email@example.com',
        'edad': 25,
        'sexo': 'M',
        'lengua': 'E',
        'suspender': False,
        'password1': 'new_password',
        'password2': 'new_password',
    })

    assert response.status_code == 200
    response = client.post(reverse('login'), {'username': 'new_user', 'password': 'new_password'})

def test_update(client):
    # Crear un usuario de prueba y log in
    user = Profile.objects.create_user(username='testuser', password='testpassword')
    client.login(username='testuser', password='testpassword')

    # Actualizar el campo first_name
    response = client.post(reverse('register:profile'), {
    'field_name': 'first_name',
    'first_name': 'new_first_name',
    })


    assert response.status_code == 302  # Redirigido al perfil
    user.refresh_from_db()
    assert user.first_name == 'new_first_name'

def test_delete(client):
    # Crear un usuario de prueba y log in
    user = Profile.objects.create_user(username='test_user_delete', password='test_password_delete')
    client.login(username='test_user_delete', password='test_password_delete')

    # Eliminar el usuario
    response = client.get(reverse('register:delete', args=[user.id]))

    assert response.status_code == 200 
    assert not Profile.objects.filter(username='testuser').exists()

def test_password_change(client, user):
    client.force_login(user)

    response = client.post(reverse('register:password_change'), {
        'old_password': 'test_password',
        'new_password1': 'newtest_password',
        'new_password2': 'newtest_password',
    })

    assert response.status_code == 302
    assert response.url == reverse('register:profile')

    user.refresh_from_db()
    assert user.check_password('newtest_password')


def test_password_reset(client, user):
    response = client.post(reverse('register:password_reset'), {
        'email': user.email,
    })

    assert response.status_code == 302
    assert response.url == reverse('register:password_reset_done')

    # Generar token y uid para el enlace de restablecimiento de contraseña
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    # Acceder a la página de confirmación de restablecimiento de contraseña
    response = client.get(reverse('register:password_reset_confirm', kwargs={'uidb64': uid, 'token': token}))
    assert response.status_code == 302

    # Enviar nueva contraseña
    response = client.post(reverse('register:password_reset_confirm', kwargs={'uidb64': uid, 'token': token}), {
        'new_password1': 'newtest_password',
        'new_password2': 'newtest_password',
    })

    assert response.status_code == 302
    
    # Log in con la nueva contraseña
    response = client.post(reverse('login'), {'username': 'new_user', 'password': 'newtest_password'})
    assert response.status_code == 200

