# Generated by Django 4.1.1 on 2023-03-07 17:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dyslexia', '0002_remove_question_test'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Test',
        ),
        migrations.AddField(
            model_name='todolist',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
