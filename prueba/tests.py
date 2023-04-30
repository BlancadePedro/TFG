from django.test import TestCase
import json
import pickle
import pandas as pd
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from .models import Test, Profile
import pytest
# Reemplace 'your_app' con el nombre de su aplicación
from prueba.views import intro, save_test_results, results

def create_test_user():
    profile = Profile.objects.create(username='test_user', password='test_password', sexo='Hombre', lengua='No', suspender='No', edad=25)
    test = Test.objects.create(user_profile=profile)
    return profile

@pytest.mark.django_db
def test_intro(client, user):
    client.login(username=user.username, password='test_password')
    response = client.get(reverse('prueba:intro'))

    assert response.status_code == 302


@pytest.mark.django_db
def test_save_test_results(client):
    profile = Profile.objects.create(username='test_user', password='test_password', sexo='Hombre', lengua='No', suspender='No', edad=25)
    test = Test.objects.create(user_profile=profile)

    user_profile_id = profile.pk
    index = 1

    response = client.post(
        reverse('prueba:save_test_results', args=[user_profile_id, index]),
    )

    assert response.status_code == 302

    test.refresh_from_db()
    test.hits[f'hits{index}'] = 1
    test.misses[f'misses{index}'] = 0
    test.clicks[f'clicks{index}'] = 1
    test.save()

    test.refresh_from_db()
    assert test.hits[f'hits{index}'] == 1
    assert test.misses[f'misses{index}'] == 0
    assert test.clicks[f'clicks{index}'] == 1