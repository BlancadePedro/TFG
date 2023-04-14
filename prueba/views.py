import json
from django.shortcuts import render
from django import forms
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.core.serializers.json import DjangoJSONEncoder
from django.templatetags.static import static
from requests import request
from register.models import Profile
from prueba.models import Test
from django.http import JsonResponse

with open('static/data/exercises.json', 'r') as f:
    exercises = json.load(f)

@login_required(login_url="/login")
def intro(request):
    user_profile = request.user
    print(user_profile)
    test = Test.objects.create(user_profile=user_profile)
    print(test)
    return render(request, "prueba/intro.html", {})

@login_required(login_url="/login")
def question(request, index):
    current = exercises[index - 1]
    return render(request, 'prueba/question.html', {'exercise': current})

@login_required(login_url="/login")
def instructions(request, index):
    current = exercises[index - 1]
    return render(request, 'prueba/instructions.html', {'exercise': current})

@login_required(login_url="/login")
def results(response):
    return render(response, "prueba/results.html", {})

@login_required(login_url="/login")
def save_test_results(request, user_profile_id, index):
    if request.method == 'POST':
        user_profile = Profile.objects.get(pk=user_profile_id)
        test, _ = Test.objects.get_or_create(user_profile=user_profile)

        data = json.loads(request.body)
        hits = data['hits']
        misses = data['misses']
        clicks = data['clicks']

        test.hits[f'hits{index}'] = int(hits[index - 1])
        test.misses[f'misses{index}'] = int(misses[index - 1])
        test.clicks[f'clicks{index}'] = int(clicks[index - 1])

        test.save()

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False})

