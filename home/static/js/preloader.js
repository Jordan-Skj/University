// ============================================================ //
// SCREEN LOADER - Option 1                                     //
// ============================================================ //

function hideLoaderAndShowContent() {
  // 1. Afficher le contenu
  const content = document.querySelector('.page-content');
  if (content) content.classList.add('loaded');

  // 2. Disparaître le loader en fondu
  const loader = document.getElementById('screen-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 700);
  }
}

// ===== LANCEMENT =====
window.addEventListener('load', function() {
  // Laisser le loader visible 1,5s minimum pour une expérience fluide
  setTimeout(function() {
    // Forcer la barre à 100% si ce n'est pas déjà fait
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    if (progressBar && progressBar.style.width !== '100%') {
      progressBar.style.width = '100%';
      progressText.textContent = '100%';
    }
    // Attendre 300ms pour que l'utilisateur voie le 100%
    setTimeout(hideLoaderAndShowContent, 300);
  }, 1500);
});

// ===== PROGRESSION DE LA BARRE =====
function startLoaderProgress() {
  let progress = 0;
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');

  if (!progressBar || !progressText) return null;

  // Simulation de progression aléatoire mais réaliste
  const interval = setInterval(() => {
    // Plus on approche de 100%, plus la progression ralentit
    const increment = Math.random() * 12 + 3;
    progress = Math.min(progress + increment, 100);
    
    progressBar.style.width = progress + '%';
    progressText.textContent = Math.round(progress) + '%';

    // Si on atteint 100%, on arrête
    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 150);

  // Sécurité : si la page est chargée avant 100%, on force la fin
  return interval;
}
// Démarrer la progression dès que la page commence à charger
const progressInterval = startLoaderProgress();
