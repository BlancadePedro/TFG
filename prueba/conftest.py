import pytest
from .tests import create_test_user

@pytest.fixture
def user():
    return create_test_user()