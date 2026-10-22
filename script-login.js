/* =========================================================
   SISTEMA DE AUTENTICACIÓN SIMULADO - ARTNOVUS
   ========================================================= */

// Base de datos Mock de usuarios
const MOCK_USERS = [
  { email: 'admin@artnovus.com', password: '123' },
  { email: 'usuario@artnovus.com', password: '123' },
  { email: 'cliente@artnovus.com', password: '123' }
];

// Variables globales para el captcha
let captchaNum1 = 0;
let captchaNum2 = 0;
let captchaCorrectResult = 0;

document.addEventListener('DOMContentLoaded', () => {

  // --- NAVEGACIÓN MÓVIL ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // --- LÓGICA DE LA PÁGINA DE INGRESO (ingreso.html) ---
  const loginForm = document.getElementById('page-login-form');
  if (loginForm) {
    initCaptcha();

    // Botón para recargar el captcha
    const reloadBtn = document.getElementById('reload-captcha-btn');
    if (reloadBtn) {
      reloadBtn.addEventListener('click', initCaptcha);
    }

    // Toggle para visualizar/ocultar contraseña
    const togglePassword = document.getElementById('page-toggle-password');
    const passwordInput = document.getElementById('page-password');
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', () => {
        const isPass = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPass ? 'text' : 'password');
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
      });
    }

    // Procesar el envío del formulario
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('page-email').value.trim();
      const passInput = document.getElementById('page-password').value.trim();
      const userCaptchaAnswer = parseInt(document.getElementById('captcha-answer').value.trim(), 10);

      // 1. Validar Captcha
      if (userCaptchaAnswer !== captchaCorrectResult) {
        showErrorModal('El resultado del desafío matemático es incorrecto. Por favor, inténtalo de nuevo.');
        return;
      }

      // 2. Validar Credenciales
      const validUser = MOCK_USERS.find(user => user.email.toLowerCase() === emailInput.toLowerCase() && user.password === passInput);

      if (validUser) {
        // Éxito: Guardar correo en sessionStorage y redirigir
        sessionStorage.setItem('artnovus_active_user', validUser.email);
        window.location.href = 'usuarios.html';
      } else {
        showErrorModal('Correo electrónico o contraseña incorrectos. Verifica tus datos e intenta nuevamente.');
      }
    });

    // Configurar eventos para las opciones del Modal de Error
    const btnRetry = document.getElementById('btn-modal-retry');
    const btnCancel = document.getElementById('btn-modal-cancel');
    const btnHelp = document.getElementById('btn-modal-help');

    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        closeErrorModal();
        loginForm.reset();
        initCaptcha();
      });
    }

    if (btnCancel) {
      btnCancel.addEventListener('click', () => {
        window.location.href = '1.inicio/inicio.html';
      });
    }

    if (btnHelp) {
      btnHelp.addEventListener('click', () => {
        window.location.href = '4.contacto/contacto.html';
      });
    }
  }

  // --- LÓGICA DE LA PÁGINA PRIVADA (usuarios.html) ---
  const userEmailDisplay = document.getElementById('user-email-display');
  const logoutBtn = document.getElementById('logout-btn');

  if (userEmailDisplay) {
    const activeUser = sessionStorage.getItem('artnovus_active_user');

    // Control de acceso: Si no está autenticado, redirige al ingreso
    if (!activeUser) {
      window.location.href = 'ingreso.html';
      return;
    }

    // Mostrar correo guardado
    userEmailDisplay.textContent = activeUser;

    // Acción de Cerrar Sesión
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('artnovus_active_user');
        window.location.href = '1.inicio/inicio.html';
      });
    }
  }
});

/**
 * Genera una operación matemática aleatoria simple para el captcha
 */
function initCaptcha() {
  const questionEl = document.getElementById('captcha-question-text');
  const captchaInput = document.getElementById('captcha-answer');

  if (questionEl) {
    captchaNum1 = Math.floor(Math.random() * 10) + 1; // 1 - 10
    captchaNum2 = Math.floor(Math.random() * 10) + 1; // 1 - 10
    captchaCorrectResult = captchaNum1 + captchaNum2;

    questionEl.textContent = `¿Cuánto es ${captchaNum1} + ${captchaNum2}?`;
    if (captchaInput) captchaInput.value = '';
  }
}

/**
 * Muestra el Modal de Error
 */
function showErrorModal(message) {
  const modal = document.getElementById('error-modal');
  const modalMsg = document.getElementById('error-modal-msg');
  if (modal) {
    if (modalMsg && message) modalMsg.textContent = message;
    modal.classList.add('active');
  }
}

/**
 * Oculta el Modal de Error
 */
function closeErrorModal() {
  const modal = document.getElementById('error-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}