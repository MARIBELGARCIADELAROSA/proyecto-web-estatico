

(function () {
  
  document.addEventListener('DOMContentLoaded', () => {
    
    const menuToggle = document.getElementById('menu-toggle') || document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('nav-links') || document.querySelector('.nav-links');

    
    console.log('[main.js] DOMContentLoaded - menuToggle:', !!menuToggle, 'navLinks:', !!navLinks);

    if (!menuToggle || !navLinks) {
      console.warn('[main.js] No se encontró el botón del menú o la lista de enlaces. Revisa los IDs/clases en HTML.');
      return;
    }

    
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);
    }

   
    function toggleMenu() {
      const opened = navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active', opened);

     
      overlay.classList.toggle('visible', opened);

      console.log('[main.js] toggleMenu -> opened:', opened);
    }

    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    }, { passive: false });

    menuToggle.addEventListener('touchstart', (e) => {
      
      e.preventDefault();
      toggleMenu();
    }, { passive: false });

   
    overlay.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      overlay.classList.remove('visible');
      console.log('[main.js] menu closed via overlay');
    });

    
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
          overlay.classList.remove('visible');
          console.log('[main.js] menu closed via link click');
        }
      });
      link.addEventListener('touchstart', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
          overlay.classList.remove('visible');
          console.log('[main.js] menu closed via link touch');
        }
      }, { passive: true });
    });

    
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

    
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      if (!header) return;
      header.classList.toggle('scrolled', window.scrollY > 50);
    });

    console.log('[main.js] Inicialización completada correctamente.');
  });
})();
