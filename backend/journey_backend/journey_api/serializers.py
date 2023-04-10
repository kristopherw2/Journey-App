from rest_framework import serializers
from .models import PostDB, CommentDB

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentDB
        fields = ['id', 'comment_text', 'date_commented', 'post']

# class PostSerializer(serializers.ModelSerializer):
#     comments = CommentSerializer(many=True, read_only=True)
#     image_url = serializers.CharField(source='get_image_url', read_only=True)
    
#     class Meta:
#         model = PostDB
#         fields = ['id', 'title', 'image', 'image_url','difficulty_level', 'description', 'latitude', 'longitude', 'date_posted', 'comments']


# class PostSerializer(serializers.ModelSerializer):
#     comments = CommentSerializer(many=True, read_only=True)
#     image_url = serializers.ReadOnlyField(source='image_data')


#     class Meta:
#         model = PostDB
#         fields = ['id', 'title', 'image_url', 'difficulty_level', 'description', 'latitude', 'longitude', 'date_posted', 'comments']


# serializers.py
from rest_framework import serializers
from .models import PostDB

class PostSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = PostDB


        fields = ['id', 'title', 'image', 'image_url','difficulty_level', 'description', 'latitude', 'longitude', 'date_posted', 'comments', 'photo']

    def get_image_url(self, obj):
        if obj.image_data:
            return f"data:image/jpeg;base64,{obj.image_data}"
        return None
