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

// ===== PROGRESSION DE LA BARRE =====
function startLoaderProgress() {
  let progress = 0;
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');

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

// Démarrer la progression dès que la page commence à charger
const progressInterval = startLoaderProgress();
// ============================================================ //
// 1. BARRE DE PROGRESSION DE DÉFILEMENT                         //
// ============================================================ //
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scroll-progress');
  if (!scrollProgress) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = Math.min(progress, 100) + '%';
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);
document.addEventListener('DOMContentLoaded', updateScrollProgress);

// ============================================================ //
// 2. MASQUAGE/RÉAPPARITION DE LA NAVBAR AU SCROLL              //
// ============================================================ //
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');
const threshold = 10; // seuil pour éviter les micro-mouvements

function handleNavbarVisibility() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > threshold) {
    // Descente → masquer
    navbar.classList.remove('visible-nav');
    navbar.classList.add('hidden-nav');
  } else if (currentScrollY < lastScrollY || currentScrollY <= threshold) {
    // Montée ou en haut → afficher
    navbar.classList.remove('hidden-nav');
    navbar.classList.add('visible-nav');
  }

  lastScrollY = currentScrollY;
}

// Appliquer visible par défaut
navbar.classList.add('visible-nav');

// Écouter le scroll avec throttling pour les performances
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleNavbarVisibility();
      ticking = false;
    });
    ticking = true;
  }
});

// ============================================================ //
// MENU MOBILE OVERLAY - OUVERTURE/FERMETURE                    //
// ============================================================ //
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const menuToggle = document.getElementById('menuToggle');
const closeMobileMenuBtn = document.getElementById('closeMobileMenu');

function openMobileMenu() {
  mobileMenuOverlay.classList.add('open');
  document.body.style.overflow = 'hidden'; // empêcher le scroll
}

function closeMobileMenu() {
  mobileMenuOverlay.classList.remove('open');
  document.body.style.overflow = ''; // restaurer le scroll
}

// Ouvrir avec le hamburger
if (menuToggle) {
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    openMobileMenu();
  });
}

// Fermer avec le X
if (closeMobileMenuBtn) {
  closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
}

// Fermer en cliquant sur un lien (via onclick dans le HTML)
window.closeMobileMenu = closeMobileMenu; // rendre la fonction globale

// Fermer en cliquant à l'extérieur (sur le fond)
mobileMenuOverlay.addEventListener('click', function(e) {
  if (e.target === this) closeMobileMenu();
});

// ============================================================ //
// SOUS-MENU FACULTÉS DANS L'OVERLAY                            //
// ============================================================ //
const mobileFacultesOverlayToggle = document.getElementById('mobileFacultesOverlayToggle');
const mobileFacultesOverlaySub = document.getElementById('mobileFacultesOverlaySub');
const mobileArrowOverlay = document.getElementById('mobileArrowOverlay');

if (mobileFacultesOverlayToggle) {
  mobileFacultesOverlayToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileFacultesOverlaySub.classList.toggle('hidden');
    if (mobileFacultesOverlaySub.classList.contains('hidden')) {
      mobileArrowOverlay.style.transform = 'rotate(0deg)';
    } else {
      mobileArrowOverlay.style.transform = 'rotate(180deg)';
    }
  });
}


