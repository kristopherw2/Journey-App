from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .serializers import PostSerializer, CommentSerializer
from rest_framework.pagination import PageNumberPagination
from .models import PostDB, CommentDB
from django.http import JsonResponse
from rest_framework import parsers
import exifread
from django.contrib.auth.models import User
from rest_framework import permissions, generics, status
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
import requests
import os  # for getting environment variables




class ToursAPIView(generics.GenericAPIView):
    def get(self, request):
        # api_key = "xBbZChwMOwiRzaLjWde5q4gIYFWnGAz8NG2Pvw1L" removed hard coded api key

        #so i changed this for all parks api views an this will be passed in as a parameter when we build the images.
        api_key = os.getenv("National_Parks_API_Key")
        response = requests.get(
            "https://developer.nps.gov/api/v1/tours",
            params={"api_key": api_key},
        )
        return Response(response.json())

class VideosAPIView(generics.GenericAPIView):
    def get(self, request):
        api_key = os.getenv("National_Parks_API_Key")
        response = requests.get(
            "https://developer.nps.gov/api/v1/multimedia/videos",
            params={"api_key": api_key},
        )
        return Response(response.json())


class ParksAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        api_key = os.getenv("National_Parks_API_Key")
        park_codes = "yose,grca"  # Hardcoding park codes (Yosemite and Grand Canyon)
        webcams_url = f"https://developer.nps.gov/api/v1/webcams?parkCode={park_codes}&api_key={api_key}"
        activities_parks_url = f"https://developer.nps.gov/api/v1/activities/parks?api_key={api_key}"

        webcams_response = requests.get(webcams_url)
        activities_parks_response = requests.get(activities_parks_url)

        if webcams_response.status_code == 200 and activities_parks_response.status_code == 200:
            data = {
                "webcams": webcams_response.json()["data"],
                "activities_parks": activities_parks_response.json()["data"]
            }
            return Response(data)
        else:
            return Response({"error": "Error fetching National Parks data."}, status=400)


class BasicPagination(PageNumberPagination):
    page_size_query_param = 'limit'


class PostListAPIView(generics.ListCreateAPIView):
    queryset = PostDB.objects.all()
    serializer_class = PostSerializer
    pagination_class = BasicPagination
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user_id = self.request.COOKIES.get("user_id")
        user = None
        if user_id:
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                pass
        if not user:
            user = self.request.user  #this is the old django setup if cookie rerival doesnt work.
        serializer.save(user=user)


class PostDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = PostDB.objects.all()
    serializer_class = PostSerializer


class CommentListCreateAPIView(ListCreateAPIView):
    queryset = CommentDB.objects.all()
    serializer_class = CommentSerializer


class CommentDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = CommentDB.objects.all()
    serializer_class = CommentSerializer


class UserPostsAPIView(ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.COOKIES.get("user_id")
        user = None
        if user_id:
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                pass
        if not user:
            user = self.request.user  # Fall back to the authenticated user if cookie retrieval fails.
        return PostDB.objects.filter(user=user)
    #Just Trying

    # def delete(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     queryset.delete()  # CAREFUL! This could easily delete all the items in this queryset.
                                       
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_create(self, serializer):
        user_id = self.request.COOKIES.get("user_id")
        user = None
        if user_id:
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                pass
        if not user:
            user = self.request.user  # Fall back to the authenticated user if cookie retrieval fails.
        serializer.save(user=user)


class DetailedUserPostsAPIView(RetrieveUpdateDestroyAPIView):
   serializer_class = PostSerializer
   permission_classes = [permissions.IsAuthenticated]


   def get_queryset(self):
       user = self.request.user
       return PostDB.objects.filter(user=user)


class ExtractLocationAPIView(APIView):
    parser_classes = [parsers.MultiPartParser]

    def extract_location_from_image(self, image):
        with image.open('rb') as f:
            tags = exifread.process_file(f)

        if 'GPS GPSLatitude' in tags and 'GPS GPSLongitude' in tags:
            lat = tags['GPS GPSLatitude'].values
            lat_ref = tags['GPS GPSLatitudeRef'].values
            lon = tags['GPS GPSLongitude'].values
            lon_ref = tags['GPS GPSLongitudeRef'].values

            latitude = lat[0] + lat[1] / 60 + lat[2].num / lat[2].den / 3600
            longitude = lon[0] + lon[1] / 60 + lon[2].num / lon[2].den / 3600

            if lat_ref == 'S':
                latitude = -latitude
            if lon_ref == 'W':
                longitude = -longitude

            return latitude, longitude
        else:
            return None

    def post(self, request, *args, **kwargs):
        image = request.FILES.get('image')
        if not image:
            return JsonResponse({'error': 'No image provided.'}, status=400)

        location = self.extract_location_from_image(image)
        if location:
            latitude, longitude = location
            response_data = {'latitude': latitude, 'longitude': longitude}
            return JsonResponse(response_data)
        else:
            return JsonResponse({'error': 'Could not extract location from image.'}, status=400)