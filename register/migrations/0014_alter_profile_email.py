# Generated by Django 4.1.1 on 2023-05-25 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0013_alter_profile_lengua_alter_profile_suspender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='email',
            field=models.EmailField(default='', max_length=150, unique=True),
        ),
    ]
