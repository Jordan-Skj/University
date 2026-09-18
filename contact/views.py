import logging
from smtplib import SMTPException

from django.conf import settings
from django.core.mail import EmailMessage
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST

from .forms import ContactForm

logger = logging.getLogger(__name__)


def contact(request: HttpRequest) -> HttpResponse:
    return render(request, 'contact/contact.html', {})


@require_POST
def send_email(request: HttpRequest) -> JsonResponse:
    data = request.POST.copy()
    data['first_name'] = data.get('first-name', '')
    data['last_name'] = data.get('last-name', '')
    form = ContactForm(data)
    if not form.is_valid():
        return JsonResponse({
            'success': False,
            'message': 'Veuillez vérifier les champs du formulaire.',
            'errors': form.errors.get_json_data(),
        }, status=400)

    if not settings.CONTACT_EMAIL:
        return JsonResponse({
            'success': False,
            'message': "Le service de messagerie est temporairement indisponible.",
        }, status=503)

    fields = form.cleaned_data
    subject = dict(form.fields['subject'].choices)[fields['subject']]
    email = EmailMessage(
        subject=f'[Contact UPK] {subject}',
        body=(
            f"Prénom : {fields['first_name']}\n"
            f"Nom : {fields['last_name']}\n"
            f"Email : {fields['email']}\n"
            f"Téléphone : {fields['phone'] or 'Non renseigné'}\n"
            f"Sujet : {subject}\n\n{fields['message']}"
        ),
        from_email=settings.CONTACT_EMAIL,
        to=[settings.CONTACT_EMAIL],
        reply_to=[fields['email']],
    )
    try:
        sent = email.send(fail_silently=False)
    except (SMTPException, OSError):
        logger.warning('Contact email delivery failed.')
        sent = 0
    if not sent:
        return JsonResponse({
            'success': False,
            'message': "L'envoi a échoué. Veuillez réessayer plus tard.",
        }, status=503)
    return JsonResponse({
        'success': True,
        'message': 'Votre message a bien été envoyé. Merci de nous avoir contactés.',
    })
