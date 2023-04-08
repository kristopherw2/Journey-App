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
from django.core.exceptions import PermissionDenied
import requests
from django.conf import settings
from django.http import Http404
import os  # for getting environment variables


########PARKS API VIEWS##################################################

class ToDoAPIView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        api_key = os.getenv("PARK_API_KEY")
        todo_url = f"https://developer.nps.gov/api/v1/thingstodo?api_key={api_key}&limit=500"


        todo_response = requests.get(todo_url)

        if todo_response.status_code == 200:
            data = todo_response.json()["data"]
            return Response({"data": data})
        else:
            print(f"Error: National Parks API returned status code {todo_response.status_code}")
            print(todo_response.text)
            return Response({"error": "Error fetching National Parks to do data."}, status=400)




class CampgroundsAPIView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        api_key = os.getenv("PARK_API_KEY")
        campgrounds_url = f"https://developer.nps.gov/api/v1/campgrounds?api_key={api_key}&limit=500"


        campgrounds_response = requests.get(campgrounds_url)

        if campgrounds_response.status_code == 200:
            data = campgrounds_response.json()["data"]
            return Response({"campgrounds": data})
        else:
            return Response({"error": "Error fetching National Parks data."}, status=400)

class TourDetailAPIView(generics.GenericAPIView):
    def get(self, request, tour_id):
        api_key = os.getenv("PARK_API_KEY")
        response = requests.get(
            "https://developer.nps.gov/api/v1/tours",
            params={"api_key": api_key},
        )

        data = response.json()
        tour = None
        for item in data["data"]:
            if item["id"] == tour_id:
                tour = item
                break

        if tour is None:
            raise Http404("Tour not found")

        return Response(tour)


class ToursAPIView(generics.GenericAPIView):
    def get(self, request):
        response = requests.get(
            "https://developer.nps.gov/api/v1/tours",
            params={"api_key": os.getenv("PARK_API_KEY"), "limit": 500},
        )
        return Response(response.json())


class VideosAPIView(generics.GenericAPIView):
    def get(self, request):
        api_key = os.getenv("PARK_API_KEY")
        response = requests.get(
            "https://developer.nps.gov/api/v1/multimedia/videos",
            params={"api_key": api_key, "limit": 500},
        )
        return Response(response.json())


class ParksAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        api_key = os.getenv("PARK_API_KEY")
        activities_parks_url = f"https://developer.nps.gov/api/v1/activities/parks?api_key={api_key}&limit=500"

        activities_parks_response = requests.get(activities_parks_url)

        if activities_parks_response.status_code == 200:
            data = {
                "activities_parks": activities_parks_response.json()["data"]
            }
            return Response(data)
        else:
            return Response({"error": "Error fetching National Parks data."}, status=400)




class WebcamsAPIView(generics.ListAPIView):
    def list(self, request, *args, **kwargs):
        api_key = os.getenv("PARK_API_KEY")
        url = f'https://developer.nps.gov/api/v1/webcams?api_key={api_key}&limit=500'
        response = requests.get(url)

        if response.status_code == 200:
            webcams = response.json()['data']
            filtered_webcams = [webcam for webcam in webcams if webcam['isStreaming']]
            return Response(filtered_webcams, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Unable to fetch webcams"}, status=status.HTTP_400_BAD_REQUEST)



########POSTS API VIEWS##################################################

class BasicPagination(PageNumberPagination):
    page_size_query_param = 'limit'


class PostListAPIView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
   

    def get_queryset(self):
        user = self.request.user
        return PostDB.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)



class PostDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = PostDB.objects.all()
    serializer_class = PostSerializer


class CommentListCreateAPIView(ListCreateAPIView):
    queryset = CommentDB.objects.all()
    serializer_class = CommentSerializer


class CommentDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = CommentDB.objects.all()
    serializer_class = CommentSerializer


class UserPostsAPIView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return PostDB.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
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




