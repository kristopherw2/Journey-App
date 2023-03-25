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


class BasicPagination(PageNumberPagination):
    page_size_query_param = 'limit'


class PostListAPIView(generics.ListCreateAPIView):
    queryset = PostDB.objects.all()
    serializer_class = PostSerializer
    pagination_class = BasicPagination
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


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
        user = self.request.user
        return PostDB.objects.filter(user=user)
    #Just Trying

    # def delete(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     queryset.delete()  # CAREFUL! This could easily delete all the items in this queryset.
                                       
    #     return Response(status=status.HTTP_204_NO_CONTENT)


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





# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.shortcuts import get_object_or_404
# from .serializers import PostSerializer, CommentSerializer
# from rest_framework.pagination import PageNumberPagination
# from .models import PostDB, CommentDB
# #below are added imports from chad 
# from django.http import JsonResponse
# from rest_framework import generics, parsers
# import exifread # pip install exifread


# # Reference for DRF Pagination when Using APIView https://medium.com/@fk26541598fk/django-rest-framework-apiview-implementation-pagination-mixin-c00c34da8ac2


# class BasicPagination(PageNumberPagination):
#     page_size_query_param = 'limit'

# class PostView(APIView):

#     pagination_class = BasicPagination

#     @property
#     def paginator(self):
#         if not hasattr(self, '_paginator'):
#             if self.pagination_class is None:
#                 self._paginator = None
#             else:
#                 self._paginator = self.pagination_class()
#         else:
#             pass
#         return self._paginator

#     def paginate_queryset(self, queryset):
        
#         if self.paginator is None:
#             return None
#         return self.paginator.paginate_queryset(queryset,
#                    self.request, view=self)

#     def get_paginated_response(self, data):
#         assert self.paginator is not None
#         return self.paginator.get_paginated_response(data)

#     def get(self, request, post_pk=None):
#         if post_pk:  
#             data = PostDB.objects.get(pk=post_pk)
#             serializer = PostSerializer(data)
#         else:
#             data = PostDB.objects.all().order_by('-date_posted')
#             page = self.paginate_queryset(data)
#             if page is not None:
#                 serializer = self.get_paginated_response(PostSerializer(page,
#                 many=True).data)
#             else:
#                 serializer = PostSerializer(data, many=True)
#         return Response({"result": serializer.data})

#     def post(self, request):
#         hiking_post = request.data
#         serializer = PostSerializer(data=hiking_post)
#         if serializer.is_valid(raise_exception=True):
#             hiking_post_saved = serializer.save()
#         return Response({"result": f"SUCCESSFULLY ADDED - New Hiking Post: {hiking_post_saved.description}"})

#     def put(self, request, post_pk):
#         saved_hiking_post = get_object_or_404(PostDB.objects.all(), pk=post_pk)
#         data = request.data
#         serializer = PostSerializer(instance=saved_hiking_post, data=data, partial=True) 
#         if serializer.is_valid(raise_exception=True):#
#             saved_hiking_post = serializer.save()
#         return Response({"result": f"SUCCESSFULLY UPDATED - Post id: {saved_hiking_post.id} "})

#     def delete(self, request, post_pk):
#         hiking_post = get_object_or_404(PostDB.objects.all(), pk=post_pk)
#         hiking_post.delete()
#         return Response({"result": f"SUCCESSFULLY DELETED - Post id: {post_pk} deleted"},status=204)

# class CommentView(APIView):

#     def get(self, request, post_pk, comment_pk=None):
#         if comment_pk:  
#             data = CommentDB.objects.get(pk=comment_pk)
#             serializer = CommentSerializer(data)
#         else:
#             data = CommentDB.objects.filter(post_id=post_pk)
#             serializer = CommentSerializer(data, many=True)
#         return Response({"result": serializer.data})

#     def post(self, request, post_pk):
#         comment = request.data
#         serializer = CommentSerializer(data=comment)
#         if serializer.is_valid(raise_exception=True):
#             comment_saved = serializer.save()
#         return Response({"result": f"SUCCESSFULLY ADDED - Comment: {comment_saved.comment_text}"})

#     def put(self, request, post_pk, comment_pk):
#         saved_comment = get_object_or_404(CommentDB.objects.all(), pk=comment_pk)
#         data = request.data
#         serializer = CommentSerializer(instance=saved_comment, data=data, partial=True) 
#         if serializer.is_valid(raise_exception=True):#
#             saved_comment = serializer.save()
#         return Response({"result": f"SUCCESSFULLY UPDATED - Comment id : {saved_comment.id}"})

#     def delete(self, request, comment_pk, post_pk):
#         comment = get_object_or_404(CommentDB.objects.all(), pk=comment_pk)
#         comment.delete()
#         return Response({"result": f"SUCCESSFULLY DELETED - Comment id {comment_pk} deleted"},status=204)




# # Define a class-based view for extracting location from an image
# class ExtractLocationView(generics.GenericAPIView):
#     # Set the parser classes to handle file uploads
#     parser_classes = [parsers.MultiPartParser]

#     # Define a method to extract location information from the image's EXIF metadata
#     def extract_location_from_image(self, image):
#         # Open the image file and process the EXIF metadata
#         with image.open('rb') as f:
#             tags = exifread.process_file(f)

#         # Check if the image has GPS data
#         if 'GPS GPSLatitude' in tags and 'GPS GPSLongitude' in tags:
#             # Extract the GPS data
#             lat = tags['GPS GPSLatitude'].values
#             lat_ref = tags['GPS GPSLatitudeRef'].values
#             lon = tags['GPS GPSLongitude'].values
#             lon_ref = tags['GPS GPSLongitudeRef'].values

#             # Calculate the decimal latitude and longitude
#             latitude = lat[0] + lat[1] / 60 + lat[2].num / lat[2].den / 3600
#             longitude = lon[0] + lon[1] / 60 + lon[2].num / lon[2].den / 3600

#             # Adjust the latitude and longitude based on their reference values (N/S and E/W)
#             if lat_ref == 'S':
#                 latitude = -latitude
#             if lon_ref == 'W':
#                 longitude = -longitude

#             # Return the decimal latitude and longitude as a tuple
#             return latitude, longitude
#         else:
#             return None

#     # Handle the POST request to extract location from the uploaded image
#     def post(self, request, *args, **kwargs):
#         # Get the image from the request's FILES dictionary
#         image = request.FILES.get('image')
#         # Check if an image is provided, return an error if not
#         if not image:
#             return JsonResponse({'error': 'No image provided.'}, status=400)

#         # Call the extract_location_from_image method to get the location data
#         location = self.extract_location_from_image(image)
#         # Check if the location was successfully extracted, return an error if not
#         if location:
#             latitude, longitude = location
#             response_data = {'latitude': latitude, 'longitude': longitude}
#             return JsonResponse(response_data)
#         else:
#             return JsonResponse({'error': 'Could not extract location from image.'}, status=400)


# class PostCreateView(generics.ListCreateAPIView):
#     queryset = PostDB.objects.all()
#     serializer_class = PostSerializer
#     parser_classes = (parsers.MultiPartParser, parsers.FormParser)