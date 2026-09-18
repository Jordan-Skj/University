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

  if (document.getElementById('dropdownNavbarLink')?.getAttribute('aria-expanded') === 'true') {
    navbar.classList.remove('hidden-nav');
    navbar.classList.add('visible-nav');
  } else if (currentScrollY > lastScrollY && currentScrollY > threshold) {
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

// Mettre en évidence la page courante dans les deux menus.
document.addEventListener('DOMContentLoaded', () => {
  const normalizePath = path => path.replace(/\/+$/, '') || '/';
  const currentPath = normalizePath(window.location.pathname);
  const links = document.querySelectorAll('#navbar-sticky a, #mobileMenuOverlay li a');

  links.forEach(link => {
    const url = new URL(link.href, window.location.href);
    const isActive = url.origin === window.location.origin &&
      normalizePath(url.pathname) === currentPath;
    const isDropdownLink = link.closest('#dropdownNavbar') !== null;

    // Éviter les couleurs de texte concurrentes sur les liens desktop.
    if (link.matches('#navbar-sticky > ul > li > a')) {
      link.classList.toggle('text-gray-200', !isActive);
    }
    link.classList.toggle('text-yellow-400', isActive && !isDropdownLink);
    link.classList.toggle('text-blue-700', isActive && isDropdownLink);
    link.classList.toggle('bg-blue-50', isActive && isDropdownLink);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  document.querySelectorAll('[data-nav-section]').forEach(button => {
    const sectionPath = normalizePath(button.dataset.navSection);
    const isActive = currentPath === sectionPath || currentPath.startsWith(sectionPath + '/');
    button.classList.toggle('text-yellow-400', isActive);
    if (button.id === 'dropdownNavbarLink') {
      button.classList.toggle('text-gray-200', !isActive);
    }
  });
});

// Dropdown desktop : une seule gestion locale, indépendante de Flowbite.
const facultiesToggle = document.getElementById('dropdownNavbarLink');
const facultiesDropdown = document.getElementById('dropdownNavbar');

if (facultiesToggle && facultiesDropdown) {
  const container = facultiesToggle.closest('li');
  const setDropdownOpen = open => {
    facultiesToggle.setAttribute('aria-expanded', String(open));
    facultiesDropdown.classList.toggle('hidden', !open);
  };

  facultiesToggle.addEventListener('click', () => {
    setDropdownOpen(facultiesToggle.getAttribute('aria-expanded') !== 'true');
  });

  container.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setDropdownOpen(false);
      facultiesToggle.focus();
    } else if (event.target === facultiesToggle && event.key === 'ArrowDown') {
      event.preventDefault();
      setDropdownOpen(true);
      facultiesDropdown.querySelector('a')?.focus();
    }
  });

  document.addEventListener('click', event => {
    if (!container.contains(event.target)) setDropdownOpen(false);
  });
  container.addEventListener('focusout', event => {
    if (!container.contains(event.relatedTarget)) setDropdownOpen(false);
  });
  facultiesDropdown.addEventListener('click', event => {
    if (event.target.closest('a')) setDropdownOpen(false);
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', () => {
    setDropdownOpen(false);
  });
}
