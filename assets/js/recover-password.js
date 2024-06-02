document.addEventListener('DOMContentLoaded', function () {
  var recoverForm = document.getElementById('recoverForm');
  var messageDiv = document.getElementById('message');

  function showMessage(message, type) {
      messageDiv.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
  }

  function handleRecoverPassword(event) {
      event.preventDefault();

      var email = document.getElementById('email').value;
      var users = JSON.parse(localStorage.getItem('users')) || [];
      var user = users.find(function (user) {
          return user.email === email;
      });

      if (user) {
          showMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.', 'success');
      } else {
          showMessage('No se encontró ninguna cuenta con ese correo electrónico.', 'danger');
      }
  }

  recoverForm.addEventListener('submit', handleRecoverPassword);
});
