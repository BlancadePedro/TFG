from django.urls import path
from . import views

app_name = "prueba"
urlpatterns = [
    path("intro", views.intro, name="intro"), 
    path("instructions/<int:index>", views.instructions, name="instructions"), 
    path("results/<int:user_profile_id>", views.results, name="results"),
    path("question/<int:index>", views.question, name="question"), 
    path('save_test_results/<int:user_profile_id>/<int:index>/', views.save_test_results, name='save_test_results'),    
]