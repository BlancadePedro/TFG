from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Profile
from .forms import ProfileForm

class ProfileAdmin(UserAdmin):
    model = Profile
    add_form = ProfileForm

    fieldsets=(
        *UserAdmin.fieldsets,
        (
            'Extra info',
            {
                'fields':(
                    'edad',
                    'sexo',
                    'lengua',
                    'suspender'
                )
            }
        )
    )
admin.site.register(Profile, ProfileAdmin)