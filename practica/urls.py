from django.urls import path
from . import views

app_name = "practica"
urlpatterns = [
    path("home", views.home, name="home"),
    path("exercise/<int:index>", views.exercise, name="exercise"), 
]