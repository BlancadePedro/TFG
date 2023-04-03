from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

app_name = "register"
urlpatterns = [
    path("profile", views.profile, name="profile"),
    path("delete/<int:user_id>", views.delete, name='delete'),
    path('password/', views.password, name='password'),
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='register/password_reset.html'), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='register/password_reset_done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='register/password_reset_confirm.html'), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='register/password_reset_complete.html'), name='password_reset_complete'),
]