import json
import pickle
import pandas as pd

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from register.models import Profile
from prueba.models import Test
from django.http import JsonResponse

with open('static/data/exercises.json', 'r') as f:
    exercises = json.load(f)

@login_required(login_url="/login")
def intro(request):
    user = request.user
    test, created = Test.objects.get_or_create(user_profile=user)
    #already in DDBB
    if not created: 
        #Data
        hits = test.hits
        misses = test.misses
        clicks = test.clicks
        #Gender = user.sexo
        Gender = 0 if user.sexo == "Hombre" else 1
        #Nativelang = user.lengua
        Nativelang = 0 if user.lengua == "No" else 1
        #Otherlang = user.suspender
        Otherlang = 0 if user.suspender == "No" else 1
        Age = user.edad

        #user info
        test_data = {"Gender": Gender, "Nativelang": Nativelang, "Otherlang": Otherlang, "Age": Age}


        for i in range(1, 33):  # Itera desde 1 hasta 32
            clicks_i = clicks.get(f"clicks{i}", None)
            hits_i = hits.get(f"hits{i}", None)
            misses_i = misses.get(f"misses{i}", None)
            
            # add data
            test_data[f"Clicks{i}"] = clicks_i
            test_data[f"Hits{i}"] = hits_i
            test_data[f"Misses{i}"] = misses_i

        prediction = test.result
        print(prediction)
        return render(request, 'prueba/results.html', {'prediction': prediction, 'Data': test_data})
    
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
def save_test_results(request, user_profile_id, index):
    user_profile = Profile.objects.get(pk=user_profile_id)
    test, _ = Test.objects.get_or_create(user_profile=user_profile)

    #first time
    if request.method == 'POST':
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

@login_required(login_url="/login")
def results(request, user_profile_id):
    #ML model
    model = pickle.load(open('ml_model.sav', 'rb'))
    
    #DDBB
    test = Test.objects.get(user_profile_id=user_profile_id)
    user = Profile.objects.get(pk=user_profile_id)
    
    #Data
    hits = test.hits
    misses = test.misses
    clicks = test.clicks
    #Gender = user.sexo
    Gender = 0 if user.sexo == "Hombre" else 1
    #Nativelang = user.lengua
    Nativelang = 0 if user.lengua == "No" else 1
    #Otherlang = user.suspender
    Otherlang = 0 if user.suspender == "No" else 1
    Age = user.edad

    #user info
    test_data = {"Gender": Gender, "Nativelang": Nativelang, "Otherlang": Otherlang, "Age": Age}


    for i in range(1, 33):  # Itera desde 1 hasta 32
        clicks_i = clicks.get(f"clicks{i}", None)
        hits_i = hits.get(f"hits{i}", None)
        misses_i = misses.get(f"misses{i}", None)
        
        # add data
        test_data[f"Clicks{i}"] = clicks_i
        test_data[f"Hits{i}"] = hits_i
        test_data[f"Misses{i}"] = misses_i

    #data ML model -> DataFrame
    df = pd.DataFrame([test_data])
    print(df)

    #predict
    prediction = model.predict(df)
    print("Eres diséxico: ",prediction)

    # Save the prediction in the database
    test.result = 1 if prediction else 0
    test.save()

    return render(request, 'prueba/results.html', {'prediction': int(prediction), 'Data': test_data})


