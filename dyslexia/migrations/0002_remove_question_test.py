# Generated by Django 4.1.1 on 2023-03-07 17:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dyslexia', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='test',
        ),
    ]