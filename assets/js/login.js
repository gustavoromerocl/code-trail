document.addEventListener('DOMContentLoaded', function () {
  var loginForm = document.getElementById('loginForm');
  var email = document.getElementById('email');
  var password = document.getElementById('password');

  function validateLoginForm(event) {
      event.preventDefault();
      event.stopPropagation();

      if (loginForm.checkValidity()) {
          if (validateCredentials(email.value, password.value)) {
              var users = JSON.parse(localStorage.getItem('users')) || [];
              var user = users.find(function (user) {
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
      var users = JSON.parse(localStorage.getItem('users')) || [];
      var user = users.find(function (user) {
          return user.email === email && user.password === password;
      });

      return !!user;
  }
});
