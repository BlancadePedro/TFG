from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Profile


class ProfileForm(UserCreationForm):
    
    class Meta:
        model = Profile
        fields = ["first_name","last_name","username","email","edad","sexo","lengua",'suspender',"password1","password2"]

        widgets = {
            'first_name' : forms.TextInput(attrs={'aria-placeholder':'José','placeholder':'José'}),
            'last_name' : forms.TextInput(attrs={'aria-placeholder':'García','placeholder':'García'}),
            'username': forms.TextInput(attrs={'aria-placeholder':'JGarcia123','placeholder':'JGarcia123'}),
            'email' : forms.EmailInput(attrs={'aria-placeholder':'JoseGarcia@gmail.com','placeholder':'JoseGarcia@gmail.com'}),
        }
        labels = {
            'first_name': 'Nombre',
            'last_name': 'Apellidos',
            'lengua': '¿Hablas solo un idioma o eres bilingüe?',
            'suspender':'¿Has suspendido alguna asignatura relacionada con el habla española?'
        }




class UpdateUsernameForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['username']

class UpdateFirstNameForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['first_name']

class UpdateLastNameForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['last_name']


class UpdateEmailNameForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['email']


class UpdateAgeNameForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['edad']


class UpdateSexNameForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['sexo']


class UpdateLanguageNameForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['lengua']

class UpdateFailNameForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['suspender']
