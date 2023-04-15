from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from .forms import ProfileForm, UpdateUsernameForm, UpdateFirstNameForm, UpdateLastNameForm, UpdateEmailNameForm, UpdateAgeNameForm, UpdateSexNameForm, UpdateLanguageNameForm, UpdateFailNameForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from .models import Profile
from django.shortcuts import render, redirect

def register(response):
    if response.method == "POST":
        form = ProfileForm(response.POST)
        if form.is_valid():
            print("loged in")
            form.save()
            # Authenticate the user
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            # Log the user in
            login(response, user)
            return render(response,"dyslexia/home.html", {})
    else:
        form = ProfileForm()
    return render(response, "register/register.html", {"form":form})

@login_required(login_url="/login")
def profile(request):

    form_mapping = {
        'username': UpdateUsernameForm,
        'first_name': UpdateFirstNameForm,
        'last_name': UpdateLastNameForm,
        'email': UpdateEmailNameForm,
        'edad': UpdateAgeNameForm,
        'sexo': UpdateSexNameForm,
        'lengua': UpdateLanguageNameForm,
        'suspender':UpdateFailNameForm
    }

    if request.method == 'POST':
        field_name = request.POST['field_name']
        FormClass = form_mapping.get(field_name)
        
        if FormClass:
            form = FormClass(request.POST, instance=request.user)
            print(form[field_name].value())
            if form.is_valid():
                form.save()
                messages.success(request, f'Campo {field_name} actualizado.')
                return redirect("/register/profile")
            else:
                messages.error(request, f'Error al actualizar el campo {field_name}.')
                print(f'Errores del formulario {field_name}:', form.errors)

    context = {
        'user': request.user
    }
    return render(request, "register/profile.html", context)


@login_required
def delete(request,user_id):
    print("user id",user_id)
    user_profile = Profile.objects.get(pk=user_id)
    print("profile",user_profile)
    user_delete = Profile.objects.filter(username=user_profile)
    user_delete.delete()
    print("All done")
    return render(request, "dyslexia/home.html")


def password_change(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Esto es importante para no cerrar la sesión del usuario
            messages.success(request, 'Tu contraseña ha sido actualizada correctamente.')
            return redirect('register:profile')
        else:
            messages.error(request, 'Por favor, corrige los errores.')
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'register/password_change.html', {'form': form})


