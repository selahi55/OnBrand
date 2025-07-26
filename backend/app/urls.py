from django.urls import path
from . import views

urlpatterns = [
    path('content/', views.content_view, name='post_content'),
    path('review/', views.review_view, name='post_review'),
    path('posts/', views.get_posts, name='get_content'),
]
