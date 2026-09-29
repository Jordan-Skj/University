from django.db import models


class Photo(models.Model):
    title = models.CharField('légende', max_length=200, blank=True)
    image = models.ImageField('image', upload_to='gallery/')
    created_at = models.DateTimeField('date d’ajout', auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'photo'
        verbose_name_plural = 'photos'

    def __str__(self):
        return self.title or f'Photo {self.pk}'