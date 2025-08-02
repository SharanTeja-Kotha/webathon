// script.js

const App = {
  init() {
    this.handleLoader();
    this.initPageTransitions();
    this.initNavbar();
    this.initPageSpecificFeatures();
  },

  // ---=== 1. LOADER ===--- //
  handleLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    window.addEventListener('load', () => {
      loader.classList.add('hidden');
    });
  },

  // ---=== 2. PAGE TRANSITIONS ===--- //
  initPageTransitions() {
    const body = document.body;
    
    // On page load, trigger wipe-out
    window.addEventListener('load', () => {
      body.classList.add('is-loaded');
    });
    
    const allLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
    allLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // Check if it's an internal link
        if (href && (href.startsWith('/') || href.startsWith('.') || href.endsWith('.html'))) {
          e.preventDefault();
          body.classList.add('is-animating');
          setTimeout(() => {
            window.location.href = href;
          }, 600); // Duration of the wipe-in animation
        }
      });
    });
  },

  // ---=== 3. NAVBAR LOGIC ===--- //
  initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Scroll effect
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Hamburger menu toggle
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
      });
    }

    // Set active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  },

  // ---=== 4. PAGE-SPECIFIC FUNCTIONS ===--- //
  initPageSpecificFeatures() {
    if (document.querySelector('.hero')) this.initHomePage();
    if (document.querySelector('.gallery-container')) this.initGalleryPage();
    if (document.querySelector('.team-list')) this.initTeamPage();
    if (document.querySelector('#contact-form')) this.initContactPage();
  },

  // Home Page: Scroll animation
  initHomePage() {
    const heroTitle = document.querySelector('.hero h1');
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const scale = 1 + scrollY / 1000;
      heroTitle.style.transform = `scale(${1 - scrollY / 1000})`;
      heroBg.style.transform = `scale(${scale})`;
    });
  },
  
  // Gallery: Horizontal mousewheel scroll
  initGalleryPage() {
    const container = document.querySelector('.gallery-container');
    if (!container) return;

    container.addEventListener('wheel', (e) => {
      // Prevent default vertical scroll
      e.preventDefault();
      // Add the Y-axis scroll value to the horizontal scroll
      container.scrollLeft += e.deltaY;
    });
  },

  // Team Page: Highlight and photo popup
  initTeamPage() {
    const list = document.querySelector('.team-list');
    const members = document.querySelectorAll('.team-member');
    const highlightBar = document.querySelector('.team-highlight-bar');
    const photoPopup = document.querySelector('.photo-popup');
    if (!list || !highlightBar || !photoPopup) return;

    const popupImg = photoPopup.querySelector('img');

    members.forEach(member => {
      member.addEventListener('mouseenter', () => {
        list.classList.add('is-hovered');
        const { top, height } = member.getBoundingClientRect();
        const listTop = list.getBoundingClientRect().top;
        
        highlightBar.style.top = `${top - listTop}px`;
        highlightBar.style.height = `${height}px`;

        popupImg.src = member.dataset.img;
        photoPopup.classList.add('visible');
      });

      member.addEventListener('mousemove', (e) => {
        photoPopup.style.left = `${e.clientX}px`;
        photoPopup.style.top = `${e.clientY}px`;
      });
    });

    list.addEventListener('mouseleave', () => {
      list.classList.remove('is-hovered');
      highlightBar.style.height = '0px';
      photoPopup.classList.remove('visible');
    });
  },
  
  // Contact Page: Form validation
  initContactPage() {
      const contactForm = document.getElementById('contact-form');
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          // Basic validation logic can be added here
          alert('Thank you for your message! (This is a demo)');
          contactForm.reset();
      });
  },
};

// Initialize the App
document.addEventListener('DOMContentLoaded', () => App.init());