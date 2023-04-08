from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


app_name = "register"
urlpatterns = [
    path("profile", views.profile, name="profile"),
    path("delete/<int:user_id>", views.delete, name='delete'),
    path('password_change/', views.password_change, name='password_change'),
]