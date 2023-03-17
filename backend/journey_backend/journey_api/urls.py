from django.urls import path
from . import views

urlpatterns = [
    path('', views.JourneyView.as_view(), name='journey_list'), # for listing and creating
    path('<int:pk>', views.JourneyView.as_view(), name='journey_detail'), # for detail, updating, and deleting
]