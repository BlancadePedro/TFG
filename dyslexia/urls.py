from django.urls import path
from . import views

app_name = "dyslexia"
urlpatterns = [
    path("home", views.home, name="home"),
    path("features", views.features, name="features"),
    path("test", views.test, name="test"),
    path("practice", views.practice, name="practice"),
]