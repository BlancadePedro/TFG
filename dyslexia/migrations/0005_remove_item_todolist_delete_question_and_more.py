# Generated by Django 4.1.1 on 2023-03-14 12:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dyslexia', '0004_alter_todolist_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='todolist',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
        migrations.RemoveField(
            model_name='todolist',
            name='user',
        ),
        migrations.DeleteModel(
            name='Item',
        ),
        migrations.DeleteModel(
            name='ToDoList',
        ),
    ]
