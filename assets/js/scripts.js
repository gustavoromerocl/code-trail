document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("registrationForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    let isValid = true;
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let birthdate = document.getElementById("birthdate");

    if (!validatePassword(password.value)) {
      password.setCustomValidity(
        "La contraseña debe contener al menos un número, una letra mayúscula y tener entre 6 y 18 caracteres."
      );
      isValid = false;
    } else {
      password.setCustomValidity("");
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Las contraseñas no coinciden.");
      isValid = false;
    } else {
      confirmPassword.setCustomValidity("");
    }

    if (!validateAge(birthdate.value)) {
      birthdate.setCustomValidity(
        "Debes tener al menos 13 años para registrarte."
      );
      isValid = false;
    } else {
      birthdate.setCustomValidity("");
    }

    if (isValid && form.checkValidity()) {
      alert("Formulario enviado exitosamente!");
      form.classList.add("was-validated");
    } else {
      form.classList.add("was-validated");
    }
  });

  function validatePassword(password) {
    let regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,18}$/;
    return regex.test(password);
  }

  function validateAge(birthdate) {
    let today = new Date();
    let birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 13;
  }
});
