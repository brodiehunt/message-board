// INPUT SELECTORS
const usernameField = document.getElementById('username');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const passwordConfirmField = document.getElementById('passwordConfirm');
// ERROR CONTAINERS
const usernameErr = document.querySelector('.username-err')
const emailErr = document.querySelector('.email-err')
const passwordErr = document.querySelector('.password-err')
const passwordConfirmErr = document.querySelector('.passwordConfirm-err')
// FORM
const registerForm = document.getElementById('register-form');

const validateUsername = (element) => {
    const username = element.value;
    let errorMsg;
    if (username.length < 3 || username.length > 20) {
        errorMsg = 'Username must be more than 3 and less than 20 characters'
    } 
    if (errorMsg) {
        usernameField.classList.add('error');
        usernameErr.textContent = errorMsg;
        return false;
    } else {
        usernameField.classList.remove('error');
        usernameErr.textContent = '';
        return true
    }
}

const validateEmail = (element) => {
    const email = element.value;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!email.match(validRegex)) {
        emailField.classList.add('error');
        emailErr.textContent = 'Email not valid. Must be in form: email@email.com';
        return false
    } else {
        emailField.classList.remove('error');
        emailErr.textContent = '';
        return true
    }
}

const validatePassword = (element) => {
    const password = element.value;
    let errorMsgs = [];
    const validRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    if (password.length < 6) {
        errorMsgs.push('Password must at least 6 characters.');
    }
    if (!password.match(validRegex)) {
        errorMsgs.push('Must contain at least one: Capital letter, lowercase letter, and number.')
    }
    if (errorMsgs.length !== 0) {
        let errorString = errorMsgs.join(' ');
        passwordField.classList.add('error');
        passwordErr.textContent = errorString;
        return false
    } else {
        passwordField.classList.remove('error');
        passwordErr.textContent = '';
        return true
    }
}

const validatePasswordConfirm = (element) => {
    let passwordConfirm = element.value;
    if (passwordConfirm !== passwordField.value) {
        passwordConfirmField.classList.add('error');
        passwordConfirmErr.textContent = 'Passwords do not match';
        return false
    } else {
        passwordConfirmField.classList.remove('error');
        passwordConfirmErr.textContent = '';
        return true
    }
}

const validateFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const isUsernameValid = validateUsername(usernameField);
    const isEmailValid = validateEmail(emailField);
    const isPasswordValid = validatePassword(passwordField);
    const isPasswordConfirmValid = validatePasswordConfirm(passwordConfirmField);

    if (isUsernameValid && isEmailValid && isPasswordValid && isPasswordConfirmValid) {
        
        form.submit();
    } else {
        return false;
    }
}

// Event listeners on focus out 
usernameField.addEventListener('focusout', (event) => validateUsername(event.target));
emailField.addEventListener('focusout', (event) => validateEmail(event.target));
passwordField.addEventListener('focusout', (event) => validatePassword(event.target));
passwordConfirmField.addEventListener('focusout', (event) => validatePasswordConfirm(event.target));
// Event listener on form submit
registerForm.addEventListener('submit', validateFormSubmit)