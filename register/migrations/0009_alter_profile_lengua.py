# Generated by Django 4.1.1 on 2023-04-01 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0008_alter_profile_lengua_alter_profile_sexo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='lengua',
            field=models.CharField(choices=[('Sí', 'Sí'), ('No', 'No')], default='No', max_length=10),
        ),
    ]
