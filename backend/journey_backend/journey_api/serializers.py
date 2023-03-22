from rest_framework import serializers
from .models import PostDB, CommentDB

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentDB
        fields = ['id', 'comment_text', 'date_commented', 'post']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = PostDB
        fields = ['id', 'title', 'image', 'difficulty_level', 'description', 'latitude', 'longitude', 'date_posted', 'comments', 'user']


