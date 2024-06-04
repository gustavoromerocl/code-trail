document.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById('registrationForm');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');
    let birthdate = document.getElementById('birthdate');
    let inputs = form.querySelectorAll('input[required]');

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
        let field = event.target;
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

        if (form.checkValidity() && !isEmailDuplicated(form.email.value)) {
            storeUserData();
            alert('Formulario enviado exitosamente!');
            form.classList.add('was-validated');
            window.location.href = '/login.html';
        } else {
            if (isEmailDuplicated(form.email.value)) {
                alert('El correo electrónico ya está registrado.');
            }
            form.classList.add('was-validated');
        }
    }

    function isEmailDuplicated(email) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(function (user) {
            return user.email === email;
        });
    }

    function storeUserData() {
        let user = {
            fullName: form.fullName.value,
            username: form.username.value,
            email: form.email.value,
            password: form.password.value,
            birthdate: form.birthdate.value,
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    form.addEventListener('submit', validateForm);

    inputs.forEach(function (input) {
        input.addEventListener('input', validateField);
    });

    password.addEventListener('input', function () {
        validatePasswordField();
    });

    confirmPassword.addEventListener('input', () => validateConfirmPasswordField());
    birthdate.addEventListener('input', function () {
        validateBirthdateField();
        validateField({ target: birthdate });
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

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age >= 13;
    }
});
