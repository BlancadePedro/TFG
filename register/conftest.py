import pytest
from django.contrib.auth import get_user_model

@pytest.fixture
def user():
    User = get_user_model()
    return User.objects.create_user(username='test_user', email='test_user@example.com', password='test_password')