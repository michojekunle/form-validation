const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const confirmPasswordEl = document.getElementById('confirm-password');

const formEl = document.getElementById('sign-up');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
})

const isRequired = value => value === ''? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
}

const showError = ( input, message ) => {
    //gets the form field element
    const formField = input.parentElement;
    
    //adds the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    //Shows the error Message
    const error = formField.querySelector('small');

    error.textContent = message;
};

const showSuccess = (input) => {
    //gets the form field element
    const formField = input.parentElement;
    
    //adds the success class and removes the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    //Clears the error Message
    const error = formField.querySelector('small');

    error.textContent = '';
};

const checkUsername = () => {
    let valid = false;

    const min = 3,
            max = 25;
    const username = usernameEl.value.trim();
    if(!isRequired(username)) {
        showError(usernameEl, "Username cannot be blank");
    } 
    else if(!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} Characters.`);
    }
    else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();

    if(!isRequired(email)) {
        showError(emailEl, "Email cannot be blank");
    } 
    else if(!isEmailValid(email)) {
        showError(emailEl, `Email is not Valid`);
    }
    else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();

    if(!isRequired(password)) {
        showError(passwordEl, "Password cannot be blank");
    } 
    else if(!isEmailValid(email)) {
        showError(emailEl, `Email is not Valid`);
    }
    else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}