from django.db import models
from register.models import Profile

class Test(models.Model):
    user_profile = models.OneToOneField(Profile, on_delete=models.CASCADE, unique=True)
    hits = models.JSONField(default=dict)
    misses = models.JSONField(default=dict)
    scores = models.JSONField(default=dict)

