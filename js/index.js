    function login() {
      const email = document.getElementById('usuario').value.trim();
      const password = document.getElementById('clave').value;

      const user = JSON.parse(localStorage.getItem(email));

      if (user && user.password === password) {
        alert('Inicio de sesión exitoso');
        window.location.href = 'principal.html';
      } else {
        alert('Correo o contraseña incorrectos');
      }
    }