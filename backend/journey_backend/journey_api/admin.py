from django.contrib import admin # brings in the admin ability
from .models import PostDB # brings in your Post model from the models.py file

admin.site.register(PostDB) # registers Post with your admin ability
