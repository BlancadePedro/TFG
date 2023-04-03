from django.shortcuts import render
from django import forms
from django.urls import reverse
from django.http import HttpResponseRedirect
# from django.http import HttpResponse

def home(response):
    return render(response, "dyslexia/home.html", {})

def features(response):
    return render(response, "dyslexia/features.html", {})

def test(response):
    return render(response, "dyslexia/test.html", {})

def practice(response):
    return render(response, "dyslexia/practice.html", {})


