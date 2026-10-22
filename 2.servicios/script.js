// Desplazamiento suave para los enlaces del men�
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});document.addEventListener('DOMContentLoaded', () => {
  const openLoginBtn = document.getElementById('open-login-btn');
  const closeLoginBtn = document.getElementById('close-login-btn');
  const loginModal = document.getElementById('login-modal');
  const togglePassword = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('login-password');
  const loginForm = document.getElementById('login-form');

  // Abrir Modal
  if (openLoginBtn && loginModal) {
    openLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal.classList.add('active');
    });
  }

  // Cerrar Modal con botón (X)
  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('active');
    });
  }

  // Cerrar Modal al hacer clic fuera del recuadro
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
});