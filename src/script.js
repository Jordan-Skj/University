// ========== GESTION DU SCREEN LOADER ==========
function hideLoaderAndShowContent() {
    // 1. Le contenu apparaît en fondu
    const content = document.querySelector('.page-content');
    if (content) {
        content.classList.add('loaded');
    }

    // 2. Le loader disparaît en fondu
    const loader = document.getElementById('screen-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 700);
    }
}

// Le loader disparaît QUAND TOUTE LA PAGE EST CHARGÉE
window.addEventListener('load', function() {
    // Petit délai supplémentaire pour que la transition soit fluide
    setTimeout(hideLoaderAndShowContent, 300);
});

// ⚠️ ATTENTION : On SUPPRIME le setTimeout de 1,8s !
// On veut que le loader reste tant que la page n'est pas prête.