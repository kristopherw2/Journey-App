from rest_framework import serializers
from .models import PostDB, CommentDB

class CommentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    comment_text = serializers.CharField(style={'base_template': 'textarea.html'})
    date_commented = serializers.DateTimeField(read_only=True)
    # post_id = serializers.PrimaryKeyRelatedField(queryset=PostDB.objects.filter(id=1))


    def create(self, instance, validated_data):
        # instance.post_id = validated_data.get('post_id', instance.post_id)
        return CommentDB.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.comment_text = validated_data.get('comment_text', instance.comment_text)
        instance.date_commented = validated_data.get('date_commented', instance.date_commented)
        # instance.post_id = validated_data.get('post_id', instance.post_id)
        instance.save()
        return instance


class JourneySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    image = serializers.CharField(max_length=255)
    difficulty_level = serializers.CharField(max_length=255)
    description = serializers.CharField(style={'base_template': 'textarea.html'})
    latitude = serializers.CharField(max_length=255)
    longitude = serializers.CharField(max_length=255)
    date_posted = serializers.DateTimeField(read_only=True)
    # comments = CommentSerializer(many=True)


    def create(self, validated_data):
        return PostDB.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.image = validated_data.get('image', instance.image)
        instance.difficulty_level = validated_data.get('difficulty_level', instance.difficulty_level)
        instance.description = validated_data.get('description', instance.description)
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get('longitude', instance.longitude)
        instance.date_posted = validated_data.get('date_posted', instance.date_posted)
        instance.save()
        return instance

