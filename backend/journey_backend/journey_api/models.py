from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from io import BytesIO
from base64 import b64encode

from django.core.files.base import ContentFile
import base64

# class Base64ImageContentFile(ContentFile):
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.file.content_type = "image/jpeg"

# class PostDB(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
#     title = models.CharField(max_length=255, blank=True)
#     image_data = models.TextField(blank=True, null=True)
#     image = models.ImageField(upload_to='images/', blank=True, null=True)
#     difficulty_level = models.CharField(max_length=255, blank=True)
#     description = models.TextField()
#     latitude = models.CharField(max_length=255, blank=True)
#     longitude = models.CharField(max_length=255, blank=True)
#     date_posted = models.DateTimeField(default=timezone.now)

#     def set_image(self, image):
#         image_data = BytesIO(image.read())
#         self.image_data = b64encode(image_data.getvalue()).decode("utf-8")

#         image_data.seek(0)
#         content_file = Base64ImageContentFile(base64.b64encode(image_data.read()))
#         self.image.save(f"{self.title}_image.jpg", content_file, save=False)

#     def __str__(self):
#         return f"User_ID {self.user.id},HikePostTitle: {self.title}, DIFFICULTY_LEVEL {self.difficulty_level}, Hiker {self.user}"



class PostDB(models.Model):
   user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
   title = models.CharField(max_length=255, blank=True) 
   image = models.ImageField(upload_to='uploadPhotos', blank=True)
   difficulty_level = models.CharField(max_length=255, blank=True)
   description = models.TextField()
   latitude = models.CharField(max_length=255, blank=True)
   longitude = models.CharField(max_length=255, blank=True)
   date_posted = models.DateTimeField(default=timezone.now)
   photo = models.CharField(max_length=255, blank=True)


   def get_image_url(self):
      if self.image:
         return f'{settings.MEDIA_URL}{self.image}'
      return None


   def __str__(self):
            return f"User_ID {self.user.id},HikePostTitle: {self.title}, DIFFICULTY_LEVEL {self.difficulty_level}, Hiker {self.user}"



class CommentDB(models.Model): 
    post = models.ForeignKey(PostDB, on_delete=models.CASCADE, related_name='comments')
    comment_text = models.TextField()
    date_commented = models.DateTimeField(default=timezone.now)

    def __str__(self):
       return f"ID: self.id , comment: self.comment_text, DATE: self.date_commented"
    