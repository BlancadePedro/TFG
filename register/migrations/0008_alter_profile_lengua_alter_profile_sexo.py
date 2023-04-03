# Generated by Django 4.1.1 on 2023-04-01 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('register', '0007_remove_profile_apellidos_remove_profile_nombre_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='lengua',
            field=models.CharField(choices=[('sí', 'Sí'), ('No', 'No')], default='No', max_length=10),
        ),
        migrations.AlterField(
            model_name='profile',
            name='sexo',
            field=models.CharField(choices=[('Hombre', 'Hombre'), ('Mujer', 'Mujer')], default='', max_length=10),
        ),
    ]
