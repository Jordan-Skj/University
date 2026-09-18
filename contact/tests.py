from smtplib import SMTPException
from unittest.mock import patch

from django.core import mail
from django.test import Client, SimpleTestCase, override_settings
from django.urls import reverse


@override_settings(
    CONTACT_EMAIL='host@example.com',
    MAILERS={'default': {'BACKEND': 'django.core.mail.backends.locmem.EmailBackend'}},
)
class ContactEmailTests(SimpleTestCase):
    def setUp(self):
        self.url = reverse('send_email')
        self.data = {
            'first-name': 'Marie', 'last-name': 'Test',
            'email': 'visitor@example.com', 'phone': '+243 123456789',
            'subject': 'information', 'message': 'Bonjour, quelles sont les formations ?',
        }

    def test_sends_to_host_with_visitor_reply_to(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])
        self.assertEqual(len(mail.outbox), 1)
        message = mail.outbox[0]
        self.assertEqual(message.to, ['host@example.com'])
        self.assertEqual(message.from_email, 'host@example.com')
        self.assertEqual(message.reply_to, ['visitor@example.com'])
        for value in ('Marie', 'Test', self.data['phone'], self.data['message']):
            self.assertIn(value, message.body)

    def test_invalid_fields_do_not_send(self):
        for field, value in [('email', 'invalid'), ('message', ' '),
                             ('subject', 'unknown'), ('first-name', ''),
                             ('message', 'x' * 10001),
                             ('email', 'user@example.com\r\nBcc: other@example.com')]:
            with self.subTest(field=field, value=value[:30]):
                response = self.client.post(self.url, {**self.data, field: value})
                self.assertEqual(response.status_code, 400)
        self.assertEqual(len(mail.outbox), 0)

    def test_post_required(self):
        self.assertEqual(self.client.get(self.url).status_code, 405)

    def test_csrf_required_and_form_token_works(self):
        client = Client(enforce_csrf_checks=True)
        self.assertEqual(client.post(self.url, self.data).status_code, 403)
        response = client.get(reverse('contact'))
        self.assertContains(response, 'contact/js/contact.js')
        self.assertContains(response, 'csrfmiddlewaretoken')
        response = client.post(self.url, self.data, HTTP_X_CSRFTOKEN=client.cookies['csrftoken'].value)
        self.assertEqual(response.status_code, 200)

    @patch('contact.views.EmailMessage.send', side_effect=SMTPException('private details'))
    def test_delivery_failure(self, send):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, 503)
        self.assertFalse(response.json()['success'])
        self.assertNotIn('private details', response.content.decode())

    @override_settings(CONTACT_EMAIL='')
    def test_missing_recipient(self):
        self.assertEqual(self.client.post(self.url, self.data).status_code, 503)
        self.assertEqual(len(mail.outbox), 0)
