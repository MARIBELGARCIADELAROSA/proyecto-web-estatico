// main.js - versión robusta con logs y soporte touch

(function () {
  // Esperar a que exista el DOM
  document.addEventListener('DOMContentLoaded', () => {
    // Referencias tolerantes (por id o clase, por si cambias)
    const menuToggle = document.getElementById('menu-toggle') || document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('nav-links') || document.querySelector('.nav-links');

    // DEBUG: verificar que los elementos existan
    console.log('[main.js] DOMContentLoaded - menuToggle:', !!menuToggle, 'navLinks:', !!navLinks);

    if (!menuToggle || !navLinks) {
      console.warn('[main.js] No se encontró el botón del menú o la lista de enlaces. Revisa los IDs/clases en HTML.');
      return;
    }

    // Crear overlay (opcional, mejora la UX y evita clicks fuera)
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);
    }

    // Función que alterna el menú
    function toggleMenu() {
      const opened = navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active', opened);

      // mostrar/ocultar overlay
      overlay.classList.toggle('visible', opened);

      console.log('[main.js] toggleMenu -> opened:', opened);
    }

    // Aceptar tanto click como touchstart para respuesta inmediata en móviles
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    }, { passive: false });

    menuToggle.addEventListener('touchstart', (e) => {
      // Evita doble activación en algunos navegadores
      e.preventDefault();
      toggleMenu();
    }, { passive: false });

    // Cerrar al pulsar en overlay
    overlay.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      overlay.classList.remove('visible');
      console.log('[main.js] menu closed via overlay');
    });

    // Cerrar menú al seleccionar un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
          overlay.classList.remove('visible');
          console.log('[main.js] menu closed via link click');
        }
      });
      // also listen for touchstart on links for faster close on mobile
      link.addEventListener('touchstart', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
          overlay.classList.remove('visible');
          console.log('[main.js] menu closed via link touch');
        }
      }, { passive: true });
    });

    // Scroll suave (ya tenías uno, hacemos fallback seguro)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const destino = document.querySelector(href);
        if (destino) {
          e.preventDefault();
          destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Formulario: validación simple (mantener)
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = form.querySelector('input[name="nombre"]');
        const email = form.querySelector('input[name="email"]');
        const mensaje = form.querySelector('textarea[name="mensaje"]');

        if (!nombre.value.trim() || !email.value.trim() || !mensaje.value.trim()) {
          alert('⚠️ Por favor, completa todos los campos.');
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
          alert('❌ Por favor, ingresa un correo válido.');
          return;
        }

        alert('✅ Mensaje enviado correctamente. ¡Gracias por contactarnos!');
        form.reset();
      });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      if (!header) return;
      header.classList.toggle('scrolled', window.scrollY > 50);
    });

    console.log('[main.js] Inicialización completada correctamente.');
  });
})();
