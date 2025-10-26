// Espera a que todo el HTML esté cargado
document.addEventListener("DOMContentLoaded", () => {
  
  
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  
  menuToggle.addEventListener("click", () => {
    
    navLinks.classList.toggle("active");
    /
    menuToggle.classList.toggle("active");
  });

 
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  });

});