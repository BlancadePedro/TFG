# Generated by Django 4.1.1 on 2023-04-14 17:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('prueba', '0002_alter_test_hits_alter_test_misses_alter_test_scores'),
    ]

    operations = [
        migrations.RenameField(
            model_name='test',
            old_name='scores',
            new_name='clicks',
        ),
    ]
