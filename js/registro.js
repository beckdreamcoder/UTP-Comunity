    function registrar() {
      const correo = document.getElementById("correo").value.trim();
      const rol = document.getElementById("rol").value;
      const clave = document.getElementById("clave").value;
      const codigo = document.getElementById("codigo").value.trim();

      if (!correo || !rol || !clave || !codigo) {
        alert("Por favor completa todos los campos.");
        return;
      }

      // Validar formato de correo UTP
      if (!correo.includes('@utp.edu.pe')) {
        alert("Por favor ingresa un correo UTP válido (@utp.edu.pe)");
        return;
      }

      const nuevoUsuario = { 
        correo, 
        rol, 
        password: clave, // Cambié 'clave' por 'password' para consistencia
        codigo 
      };

      // Guardar usuario individual por correo (como en el login)
      localStorage.setItem(correo, JSON.stringify(nuevoUsuario));

      // También mantener la lista de usuarios
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Registro exitoso");
      window.location.href = "index.html";
    }

    function cancelar() {
      window.location.href = "index.html";
    }

    // Validación en tiempo real del correo
    document.getElementById('correo').addEventListener('blur', function() {
      const correo = this.value.trim();
      if (correo && !correo.includes('@utp.edu.pe')) {
        this.style.borderColor = '#dc3545';
        this.style.backgroundColor = '#fff5f5';
      } else {
        this.style.borderColor = '#ccc';
        this.style.backgroundColor = '#f9f9f9';
      }
    });