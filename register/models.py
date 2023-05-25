from django.db import models
from django.contrib.auth.models import AbstractUser

class Profile(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=150,unique=True,default="")
    edad = models.PositiveSmallIntegerField(null=True)
    sexo = models.CharField(max_length=10, choices=[("Hombre", "Hombre"), ("Mujer", "Mujer")],default="")
    lengua = models.CharField(max_length=50, choices=[("Sí", "Sí"), ("No", "No")], default="No")
    suspender = models.CharField(max_length=50, choices=[("Sí", "Sí"), ("No", "No")], default="No")