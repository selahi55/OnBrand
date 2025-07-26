from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def content_view(request):
    content_data = request.data
    # You can validate/process/store the data here
    return Response({
        'message': 'Content received successfully',
        'data': content_data
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def review_view(request):
    review_data = request.data
    # You can validate/process/store the data here
    return Response({
        'message': 'Review received successfully',
        'data': review_data
    }, status=status.HTTP_201_CREATED)
