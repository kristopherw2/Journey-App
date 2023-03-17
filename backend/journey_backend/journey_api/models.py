from django.db import models
from django.utils import timezone


class PostDB(models.Model):
   image = models.CharField(max_length=255)
   difficulty_level = models.CharField(max_length=255, blank=True)
   description = models.TextField()
   latitude = models.CharField(max_length=255, blank=True)
   longitude = models.CharField(max_length=255, blank=True)
   date_posted = models.DateTimeField(default=timezone.now)


   def __str__(self):
       return f"ID: self.id , PHOTO: self.image, DIFFICULTY_LEVEL: self.difficulty_level, DATE: self.date_posted"