from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class PostDB(models.Model):
   user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
   title = models.CharField(max_length=255, blank=True) 
   image = models.ImageField(upload_to='uploadPhotos')
   difficulty_level = models.CharField(max_length=255, blank=True)
   description = models.TextField()
   latitude = models.CharField(max_length=255, blank=True)
   longitude = models.CharField(max_length=255, blank=True)
   date_posted = models.DateTimeField(default=timezone.now)


   def __str__(self):
            return f"User_ID {self.user.id},HikePostTitle: {self.title}, DIFFICULTY_LEVEL {self.difficulty_level}, Hiker {self.user}"



class CommentDB(models.Model): 
    post = models.ForeignKey(PostDB, on_delete=models.CASCADE, related_name='comments')
    comment_text = models.TextField()
    date_commented = models.DateTimeField(default=timezone.now)

    def __str__(self):
       return f"ID: self.id , comment: self.comment_text, DATE: self.date_commented"
    