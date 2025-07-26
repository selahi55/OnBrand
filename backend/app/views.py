import dateparser
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Post
from django.core.files import File
import os

from .serializers import PostSerializer

# /content (post 10 prev posts)
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def content_view(request):
    title = request.data.get('title')
    content = request.data.get('content')
    category = request.data.get('category')
    platform = request.data.get('platform')
    status_value = request.data.get('status', 'Needs Review')
    image = request.FILES.get('image')  # May be None

    if not title or not content or not category or not platform:
        return Response({'error': 'Missing required fields in request body.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        post = Post.objects.create(
            title=title,
            content=content,
            category=category,
            platform=platform,
            status=status_value,
            image=image
        )
    except Exception as e:
        return Response({'error': f'Failed to save post: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({
        'message': 'Content saved successfully',
        'post': {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'category': post.category,
            'platform': post.platform,
            'status': post.status,
            'image_url': post.image.url if post.image else None,
            'date': post.date
        }
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def review_view(request):
    title = request.data.get('title')
    text = request.data.get('text')
    image = request.FILES.get('image')  # May be None
    date = dateparser.parse(request.data.get('date'))

    if not title or not text or not image or not date:
        return Response({'error': 'Missing title or text in request body.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({
        'message': 'Content saved successfully',
        'post': {
            'title': title,
            'text': text,
            'date': date
        }
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_posts(request):
    posts = Post.objects.all().order_by('-date')
    serializer = PostSerializer(posts, many=True)
    return Response({'posts': serializer.data})
