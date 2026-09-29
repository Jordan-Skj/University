from django.test import TestCase, override_settings
from django.urls import reverse


@override_settings(STORAGES={
    'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'},
    'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
})
class GalleryPageTests(TestCase):
    def test_gallery_page_is_available_without_photos(self):
        response = self.client.get(reverse('gallery'))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Aucune photo n’a encore été publiée.')