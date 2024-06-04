document.addEventListener('DOMContentLoaded', function () {
  let loginForm = document.getElementById('loginForm');
  let email = document.getElementById('email');
  let password = document.getElementById('password');

  function validateLoginForm(event) {
      event.preventDefault();
      event.stopPropagation();

      if (loginForm.checkValidity()) {
          if (validateCredentials(email.value, password.value)) {
              let users = JSON.parse(localStorage.getItem('users')) || [];
              let user = users.find(function (user) {
                  return user.email === email.value;
              });

              localStorage.setItem('loggedInUser', JSON.stringify(user));
              alert('Inicio de sesión exitoso!');
              window.location.href = 'index.html';
          } else {
              alert('Correo electrónico o contraseña incorrectos.');
          }
      } else {
          loginForm.classList.add('was-validated');
      }
  }

  loginForm.addEventListener('submit', validateLoginForm);

  function validateCredentials(email, password) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      let user = users.find(function (user) {
          return user.email === email && user.password === password;
      });

      return !!user;
  }
});
