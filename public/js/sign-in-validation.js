// INPUT SELECTORS
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');

// ERROR CONTAINERS
const emailErr = document.querySelector('.email-err')
const passwordErr = document.querySelector('.password-err')

// FORM
const signInForm = document.getElementById('sign-in-form');

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

const validateFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const isEmailValid = validateEmail(emailField);
    const isPasswordValid = validatePassword(passwordField);

    if (isEmailValid && isPasswordValid) {
        form.submit();
    } else {
        return false;
    }
}

// Event listeners on focus out 
emailField.addEventListener('focusout', (event) => validateEmail(event.target));
passwordField.addEventListener('focusout', (event) => validatePassword(event.target));

// Event listener on form submit
signInForm.addEventListener('submit', validateFormSubmit)