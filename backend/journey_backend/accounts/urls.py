from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SigninView
from .views import SignupView
from .views import SignoutView

urlpatterns = [
    path('signin_api/', SigninView.as_view()),
    path('signup_api/', SignupView.as_view()),
    path('signout_api/', SignoutView.as_view()),
]