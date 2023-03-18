from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .serializers import JourneySerializer, CommentSerializer
from rest_framework.pagination import PageNumberPagination
from .models import PostDB, CommentDB


# Reference for DRF Pagination when Using APIView https://medium.com/@fk26541598fk/django-rest-framework-apiview-implementation-pagination-mixin-c00c34da8ac2


class BasicPagination(PageNumberPagination):
    page_size_query_param = 'limit'

class JourneyView(APIView):

    pagination_class = BasicPagination
    # serializer_class = JourneySerializer

    @property
    def paginator(self):
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        else:
            pass
        return self._paginator

    def paginate_queryset(self, queryset):
        
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset,
                   self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, pk=None):
        if pk:  
            print("#########################")
            data = PostDB.objects.get(pk=pk)
            print("#########################")
            serializer = JourneySerializer(data)
        else:
            data = PostDB.objects.all()
            page = self.paginate_queryset(data)
            if page is not None:
                serializer = self.get_paginated_response(JourneySerializer(page,
                many=True).data)
            else:
                serializer = JourneySerializer(data, many=True)
        return Response({"result": serializer.data})

    def post(self, request):
        hiking_post = request.data
        serializer = JourneySerializer(data=hiking_post)
        if serializer.is_valid(raise_exception=True):
            hiking_post_saved = serializer.save()
        return Response({"result": f"SUCCESSFULLY ADDED - New Hiking Post: {hiking_post_saved.description}"})

    def put(self, request, pk):
        saved_hiking_post = get_object_or_404(PostDB.objects.all(), pk=pk)
        data = request.data
        serializer = JourneySerializer(instance=saved_hiking_post, data=data, partial=True) #partial means not all fields are required 
        #The .is_valid() method takes an optional raise_exception flag that will cause it to raise a serializers.ValidationError exception if there are validation errors.
        if serializer.is_valid(raise_exception=True):#
            saved_hiking_post = serializer.save()
        return Response({"result": f"SUCCESSFULLY UPDATED - {saved_hiking_post.id} updated"})

    def delete(self, request, pk):
        hiking_post = get_object_or_404(PostDB.objects.all(), pk=pk)
        hiking_post.delete()
        return Response({"result": f"SUCCESSFULLY DELETED - Post id {pk} deleted"},status=204)

class CommentView(APIView):

    def get(self, request, comment_pk=None):
        if comment_pk:  
            data = CommentDB.objects.get(pk=comment_pk)
            serializer = CommentSerializer(data)
        else:
            data = CommentDB.objects.all()
            serializer = CommentSerializer(data, many=True)
        return Response({"result": serializer.data})

    def post(self, request):
        comment = request.data
        serializer = CommentSerializer(data=comment)
        if serializer.is_valid(raise_exception=True):
            comment_saved = serializer.save()
        return Response({"result": f"SUCCESSFULLY ADDED - Comment: {comment_saved.comment_text}"})

    def put(self, request, comment_pk):
        saved_comment = get_object_or_404(CommentDB.objects.all(), pk=comment_pk)
        data = request.data
        serializer = CommentSerializer(instance=saved_comment, data=data, partial=True) 
        if serializer.is_valid(raise_exception=True):#
            saved_comment = serializer.save()
        return Response({"result": f"SUCCESSFULLY UPDATED - Comment id : {saved_comment.id}"})

    def delete(self, request, comment_pk):
        comment = get_object_or_404(CommentDB.objects.all(), pk=comment_pk)
        comment.delete()
        return Response({"result": f"SUCCESSFULLY DELETED - Comment id {comment_pk} deleted"},status=204)




