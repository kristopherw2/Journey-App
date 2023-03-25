from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.PostListAPIView.as_view(), name="post-list"),
    path("posts/<int:pk>/", views.PostDetailAPIView.as_view(), name="post-detail"),
    path("posts/<int:pk>/comments/", views.CommentListCreateAPIView.as_view(), name="comment-create"),
    path("comments/<int:pk>/", views.CommentDetailAPIView.as_view(), name="comment-detail"),
    path("extract_location/", views.ExtractLocationAPIView.as_view(), name="extract-location"),
    path("userposts/", views.UserPostsAPIView.as_view(), name="user-posts"),
    path("parks/", views.ParksAPIView.as_view(), name="parks"),
    path("tours/", views.ToursAPIView.as_view(), name="tours"),
    path("videos/", views.VideosAPIView.as_view(), name="videos"),
]




# from django.urls import path
# from . import views

# urlpatterns = [

#     #Routes related to Post 
#     path('post', views.PostView.as_view(), name='post_list'), 
#     path('post/<int:post_pk>', views.PostView.as_view(), name='post_detail'), 
#     path('extract_location/', views.ExtractLocationView.as_view(), name='extract_location'),
#     path('posts/', views.PostCreateView.as_view(), name='create_post'),

#     #Routes related to Comment
#     path('post/<int:post_pk>/comments', views.CommentView.as_view(), name='comment_list'), 
#     path('post/<int:post_pk>/comments/<int:comment_pk>', views.CommentView.as_view(), name='comment_details'), 

# ]

