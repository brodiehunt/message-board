// INPUT SELECTORS
const usernameField = document.getElementById('username');
const emailField = document.getElementById('email');

// ERROR CONTAINERS
const usernameErr = document.querySelector('.username-err')
const emailErr = document.querySelector('.email-err')

// FORM
const updateForm = document.getElementById('update-form');

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

const validateFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const isUsernameValid = validateUsername(usernameField);
    const isEmailValid = validateEmail(emailField);

    if (isUsernameValid && isEmailValid) {
        
        form.submit();
    } else {
        return false;
    }
}

// Event listeners on focus out 
usernameField.addEventListener('focusout', (event) => validateUsername(event.target));
emailField.addEventListener('focusout', (event) => validateEmail(event.target));

// Event listener on form submit
updateForm.addEventListener('submit', validateFormSubmit)