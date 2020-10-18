from django.contrib import admin
from .models import User

# Register your models here.
@admin.register(User)
class ClientModelAdmin(admin.ModelAdmin):
    fields = ("email","password", "mobile_number", "first_name", "last_name", "birthdate", "gender", "is_staff")
