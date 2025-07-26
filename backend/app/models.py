from django.db import models

class Post(models.Model):
    CATEGORY_CHOICES = [
        ('Marketing', 'Marketing'),
        ('Product', 'Product'),
        ('Case Study', 'Case Study'),
        ('Research', 'Research'),
        ('Promotion', 'Promotion'),
    ]

    PLATFORM_CHOICES = [
        ('LinkedIn', 'LinkedIn'),
        ('Facebook', 'Facebook'),
        ('Instagram', 'Instagram'),
        ('Twitter', 'Twitter'),
        ('Blog', 'Blog'),
    ]

    STATUS_CHOICES = [
        ('Needs Review', 'Needs Review'),
        ('Ready to Publish', 'Ready to Publish'),
    ]

    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Needs Review')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Review(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review of '{self.post.title}' - {self.rating}⭐"
