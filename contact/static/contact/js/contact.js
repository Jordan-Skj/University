(() => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const button = form.querySelector('button[type="submit"]');
    const status = document.getElementById('contact-status');
    let sending = false;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (sending || !form.reportValidity()) return;

        sending = true;
        button.disabled = true;
        const label = button.textContent;
        button.textContent = 'Envoi en cours…';
        status.textContent = '';
        form.setAttribute('aria-busy', 'true');

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                credentials: 'same-origin',
                headers: { 'Accept': 'application/json' },
            });
            const data = await response.json();
            if (!response.ok || !data.success) {
                const errors = Object.values(data.errors || {})
                    .flat().map((error) => error.message).join(' ');
                throw new Error([data.message, errors].filter(Boolean).join(' ')
                    || "L'envoi a échoué. Veuillez réessayer.");
            }
            status.textContent = data.message;
            form.reset();
        } catch (error) {
            status.textContent = error instanceof SyntaxError || error instanceof TypeError
                ? "Impossible d'envoyer le message. Vérifiez votre connexion ou rechargez la page."
                : error.message;
        } finally {
            sending = false;
            button.disabled = false;
            button.textContent = label;
            form.removeAttribute('aria-busy');
        }
    });
})();
