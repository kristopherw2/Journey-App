from django.urls import path
from . import views

urlpatterns = [
    # path('', views.JourneyView.as_view(), name='journey_list'), # for listing and creating
    # path('<int:pk>', views.JourneyView.as_view(), name='journey_detail'), # for detail, updating, and deleting

    #Routes related to Post 
    path('post', views.JourneyView.as_view(), name='journey_list'), 
    path('post/<int:pk>', views.JourneyView.as_view(), name='journey_detail'), 

    #Routes related to Comment
    path('comment', views.CommentView.as_view(), name='comment_list'), 
    path('comment/<int:comment_pk>', views.CommentView.as_view(), name='comment_detail'), 

]

