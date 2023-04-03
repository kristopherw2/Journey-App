from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .serializers import SignupSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework import status
from django.http import JsonResponse
from rest_framework.authtoken.views import ObtainAuthToken

class SignupView(APIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            email = serializer.validated_data['email']
            User.objects.create_user(username=username, password=password, email=email)
            # serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request):
    #     serializer = self.serializer_class(data=request.data)
    #     if serializer.is_valid():
    #         username = serializer.validated_data['username']
    #         password = serializer.validated_data['password']
    #         email = serializer.validated_data['email']
    #         user = User.objects.create_user(username=username, password=password, email=email)

    #         # Create and return an authentication token for the newly registered user
    #         token, _ = Token.objects.get_or_create(user=user)
    #         response_data = serializer.data
    #         response_data['token'] = token.key

    #         return Response(response_data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






class SigninView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")
        user = authenticate(username=username, password=password, email=email)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            response = JsonResponse({"token": token.key, "user_id": user.pk}, status=200)  # Add the user_id to the response
            return response
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)



class SignoutView(APIView):
    def post(self, request):
        try:
            token_key = request.auth.key
            token = Token.objects.get(key=token_key)
            token.delete()
            return Response({"detail": "Token deleted successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)