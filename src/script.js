// ========== GESTION DU SCREEN LOADER ==========
function hideLoader() {
    const loader = document.getElementById('screen-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 700);
    }
}

// Le loader reste 1.8 secondes minimum
setTimeout(hideLoader, 1800);

// Le loader disparaît dès que la page est entièrement chargée
window.addEventListener('load', hideLoader);