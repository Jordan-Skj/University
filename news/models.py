from django.db import models

# Create your models here.
class News(models.Model):
    title = models.CharField('titre', max_length=200)
    content = models.TextField('contenu')
    published_date = models.DateTimeField('date de publication', auto_now_add=True)
    image = models.ImageField('image', upload_to='news_images/', blank=True, null=True)

    class Meta:
        verbose_name = "actualité"
        verbose_name_plural = "actualités"


    def __str__(self):
        return self.title