from django.urls import path
from . import views

urlpatterns = [

    #Routes related to Post 
    path('post', views.PostView.as_view(), name='post_list'), 
    path('post/<int:post_pk>', views.PostView.as_view(), name='post_detail'), 

    #Routes related to Comment
    path('post/<int:post_pk>/comments', views.CommentView.as_view(), name='comment_list'), 
    path('post/<int:post_pk>/comments/<int:comment_pk>', views.CommentView.as_view(), name='comment_details'), 


 

]

