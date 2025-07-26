import dateparser
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Post
from django.core.files import File
import os

from .serializers import PostSerializer


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def content_view(request):
    title = request.data.get('title')
    text = request.data.get('text')
    image = request.FILES.get('image')  # May be None
    date = dateparser.parse(request.data.get('date'))


    if not title or not text or not image or not date:
        return Response({'error': 'Missing title or text in request body.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        post = Post.objects.create(
            title=title,
            body=text,
            image=image
        )
    except Exception as e:
        return Response({'error': f'Failed to save post: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({
        'message': 'Content saved successfully',
        'post': {
            'id': post.id,
            'title': post.title,
            'text': post.body,
            'image_url': post.image.url,
            'date': post.date
        }
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def review_view(request):
    post_data = request.data.get('post')

    if not post_data:
        return Response({'error': 'Missing "post" in request body.'}, status=status.HTTP_400_BAD_REQUEST)

    # Optionally validate fields like rating/review text here
    return Response({
        'message': 'Review received successfully',
        'post': post_data
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_posts(request):
    posts = Post.objects.all().order_by('-date')
    serializer = PostSerializer(posts, many=True)
    return Response({'posts': serializer.data})
