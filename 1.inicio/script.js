/* SCRIPT PARA MENÚ MÓVIL */
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
}); document.addEventListener('DOMContentLoaded', () => {
  const openLoginBtn = document.getElementById('open-login-btn');
  const closeLoginBtn = document.getElementById('close-login-btn');
  const loginModal = document.getElementById('login-modal');
  const togglePassword = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('login-password');
  const loginForm = document.getElementById('login-form');

  // Abrir Modal
  if (openLoginBtn && loginModal) {
    openLoginBtn.addEventListener('click', () => {
      loginModal.classList.add('active');
    });
  }

  // Cerrar Modal con botón (X)
  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('active');
    });
  }

  // Cerrar Modal dando clic fuera del recuadro
  window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove('active');
    }
  });

  // Mostrar / Ocultar Contraseña
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      togglePassword.classList.toggle('fa-eye');
      togglePassword.classList.toggle('fa-eye-slash');
    });
  }

  // Envío del formulario
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Inicio de sesión exitoso!');
      loginModal.classList.remove('active');
    });
  }
});// EFECTO TILT 3D EN LAS TARJETAS DEL PORTAFOLIO
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.style.transform = `translateY(-8px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});