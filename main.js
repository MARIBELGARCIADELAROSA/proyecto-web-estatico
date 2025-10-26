/* ============================
   main.js – Código principal
   ============================ */

// ========= MENÚ HAMBURGUESA =========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });
}

// ========= SCROLL SUAVE =========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      e.preventDefault();
      destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========= FORMULARIO DE CONTACTO =========
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

// ========= EFECTO SCROLL EN HEADER =========
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========= EFECTO SUAVE EN CARGA =========
window.addEventListener('load', () => {
  document.body.classList.add('page-loaded');
});
