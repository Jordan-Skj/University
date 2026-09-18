from django import forms


class ContactForm(forms.Form):
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    email = forms.EmailField(max_length=254)
    phone = forms.CharField(max_length=50, required=False)
    subject = forms.ChoiceField(choices=[
        ('admission', "Demande d'admission"),
        ('information', "Demande d'information"),
        ('partenariat', 'Proposition de partenariat'),
        ('visite', 'Visite du campus'),
        ('autre', 'Autre'),
    ])
    message = forms.CharField(max_length=10000)
