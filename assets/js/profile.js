document.addEventListener('DOMContentLoaded', function() {
  // Función para obtener el usuario logueado desde localStorage
  function getLoggedInUser() {
      return JSON.parse(localStorage.getItem('loggedInUser'));
  }

  // Función para cargar la información del usuario en el formulario
  function loadUserProfile() {
      const user = getLoggedInUser();
      if (user) {
          document.getElementById('fullName').value = user.fullName;
          document.getElementById('username').value = user.username;
          document.getElementById('email').value = user.email;
          document.getElementById('dob').value = user.birthdate; // Directamente asignar la fecha en formato YYYY-MM-DD
          document.getElementById('address').value = user.address;
      }
  }

  // Función para guardar la información actualizada del usuario en localStorage
  function saveUserProfile(event) {
      event.preventDefault();
      
      const user = getLoggedInUser();
      const updatedUser = {
          fullName: document.getElementById('fullName').value,
          username: document.getElementById('username').value,
          email: document.getElementById('email').value,
          birthdate: document.getElementById('dob').value,
          address: document.getElementById('address').value,
          password: user.password,
          role: user.role || ''
      };

      // Actualizar el usuario en localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(u => u.email === user.email);

      if (userIndex !== -1) {
          users[userIndex] = updatedUser;
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
          alert('Perfil actualizado exitosamente');
      } else {
          alert('Error al actualizar el perfil');
      }
  }

  // Cargar la información del usuario cuando se cargue la página
  loadUserProfile();

  // Agregar evento para manejar el envío del formulario
  document.getElementById('profileForm').addEventListener('submit', saveUserProfile);
  
  // Manejar el cierre de sesión
  document.getElementById('logoutButton').addEventListener('click', function() {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'login.html';
  });
});
