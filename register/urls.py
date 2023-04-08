from django.urls import path
from . import views
from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views

from django.urls import path
from . import views
from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views

app_name = "register"
urlpatterns = [
    path('register/password_reset/', auth_views.PasswordResetView.as_view(template_name="register/password_reset.html", email_template_name="register/password_reset_email.html", success_url=reverse_lazy("register:password_reset_done")), name="password_reset"),
    path('register/password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name="register/password_reset_done.html"), name="password_reset_done"),
    path('register/reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name="register/password_reset_confirm.html", success_url=reverse_lazy("register:password_reset_complete")), name="password_reset_confirm"),
    path('register/reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name="register/password_reset_complete.html"), name="password_reset_complete"),
    path("profile", views.profile, name="profile"),
    path("delete/<int:user_id>", views.delete, name='delete'),
    path('password_change/', views.password_change, name='password_change'),
]


