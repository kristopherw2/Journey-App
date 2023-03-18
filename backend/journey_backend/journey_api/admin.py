from django.contrib import admin # brings in the admin ability
from .models import PostDB , CommentDB # brings in your Post model from the models.py file

admin.site.register(PostDB) # registers Post with your admin ability
admin.site.register(CommentDB) # registers Post with your admin ability

