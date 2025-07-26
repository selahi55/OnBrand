from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'category', 'platform', 'image', 'image_url', 'status', 'date']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None
