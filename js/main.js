const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const confirmPasswordEl = document.getElementById('confirm-password');

const formEl = document.getElementById('sign-up');

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
        showError(emailEl, "Email cannot be blank.");
    } 
    else if(!isEmailValid(email)) {
        showError(emailEl, `Email is not Valid.`);
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
        showError(passwordEl, "Password cannot be blank.");
    } 
    else if(!isPasswordSecure(password)) {
        showError(passwordEl, `Password must contain 8 characters which include 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character in (!@#$%^&*).`);
    }
    else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
}

const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = confirmPasswordEl.value.trim();
    const password  = passwordEl.value.trim();

    if(!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please Enter the password Again')
    }
    else if(password !== confirmPassword) {
        showError(confirmPasswordEl, 'Passwords don\'t Match')
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
}

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        //Cancel the Previous Timer
        if(timeoutId){
            clearTimeout(timeoutId);
        }

        //sets up a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay)
    };
};

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //Validate Fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

    //Submits to the Servr if Valid
    if(isFormValid) {

    }
})


formEl.addEventListener('input', function(e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
        case 'username':
            checkUsername();
            break;
        default:
            break;
    }
})