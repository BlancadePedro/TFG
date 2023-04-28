from django.shortcuts import render
import json
from django import forms
from django.contrib.auth.decorators import login_required

with open('static/data/practices.json', 'r') as f:
    exercises = json.load(f)

def home(response):
    return render(response, "practica/home.html", {})

@login_required(login_url="/login")
def exercise(request, index):
    current = exercises[index - 1]
    return render(request, 'practica/exercise.html', {'index': index, 'exercise': current})