from django.shortcuts import render

from django import forms
from django.urls import reverse
from django.http import HttpResponseRedirect

def home(response):
    return render(response, "practica/home.html", {})