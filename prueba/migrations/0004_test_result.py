# Generated by Django 4.1.1 on 2023-05-25 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prueba', '0003_rename_scores_test_clicks'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='result',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
