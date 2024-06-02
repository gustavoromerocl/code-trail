document.addEventListener('DOMContentLoaded', function () {
  var userProfile = document.getElementById('userProfile');

  function loadUserProfile() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      userProfile.innerHTML = `
              <p><strong>Nombre Completo:</strong> ${loggedInUser.fullName}</p>
              <p><strong>Nombre de Usuario:</strong> ${loggedInUser.username}</p>
              <p><strong>Correo Electrónico:</strong> ${loggedInUser.email}</p>
              <p><strong>Fecha de Nacimiento:</strong> ${loggedInUser.birthdate}</p>
              <p><strong>Dirección:</strong> ${loggedInUser.address || 'No especificada'}</p>
          `;
    } else {
      window.location.href = 'login.html';
    }
  }

  function checkLoggedInUser() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      document.getElementById('navbarLinks').innerHTML = `
              <li class="nav-item">
                  <a class="nav-link" href="index.html">Inicio</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#" id="logoutButton">Cerrar Sesión</a>
              </li>
          `;
      document.getElementById('logoutButton').addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
      });
    }
  }

  loadUserProfile();
  checkLoggedInUser();
});
