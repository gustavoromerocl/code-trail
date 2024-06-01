document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('registrationForm');
  var password = document.getElementById('password');
  var confirmPassword = document.getElementById('confirmPassword');
  var birthdate = document.getElementById('birthdate');
  var inputs = form.querySelectorAll('input[required]');

  function validatePasswordField() {
      if (!validatePassword(password.value)) {
          password.setCustomValidity('La contraseña debe contener al menos un número, una letra mayúscula y tener entre 6 y 18 caracteres.');
      } else {
          password.setCustomValidity('');
      }
  }

  function validateConfirmPasswordField() {
      if (password.value !== confirmPassword.value) {
          confirmPassword.setCustomValidity('Las contraseñas no coinciden.');
      } else {
          confirmPassword.setCustomValidity('');
      }
  }

  function validateBirthdateField() {
      if (!validateAge(birthdate.value)) {
          birthdate.setCustomValidity('Debes tener al menos 13 años para registrarte.');
      } else {
          birthdate.setCustomValidity('');
      }
  }

  function validateField(event) {
      var field = event.target;
      if (!field.checkValidity()) {
          field.classList.add('is-invalid');
          field.classList.remove('is-valid');
      } else {
          field.classList.remove('is-invalid');
          field.classList.add('is-valid');
      }
  }

  function validateForm(event) {
      event.preventDefault();
      event.stopPropagation();

      validatePasswordField();
      validateConfirmPasswordField();
      validateBirthdateField();

      if (form.checkValidity()) {
          storeUserData();
          alert('Formulario enviado exitosamente!');
          form.classList.add('was-validated');
      } else {
          form.classList.add('was-validated');
      }
  }

  function storeUserData() {
      var user = {
          fullName: form.fullName.value,
          username: form.username.value,
          email: form.email.value,
          password: form.password.value,
          birthdate: form.birthdate.value,
          address: form.address.value
      };

      var users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
  }

  form.addEventListener('submit', validateForm);

  inputs.forEach(function(input) {
      input.addEventListener('input', validateField);
  });

  password.addEventListener('input', function() {
      validatePasswordField();
      validateConfirmPasswordField();
  });

  confirmPassword.addEventListener('input', validateConfirmPasswordField);
  birthdate.addEventListener('input', function() {
      validateBirthdateField();
      validateField({ target: birthdate });
  });

  function validatePassword(password) {
      var regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/;
      return regex.test(password);
  }

  function validateAge(birthdate) {
      var today = new Date();
      var birthDate = new Date(birthdate);
      var age = today.getFullYear() - birthDate.getFullYear();
      var monthDifference = today.getMonth() - birthDate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }

      return age >= 13;
  }
});
