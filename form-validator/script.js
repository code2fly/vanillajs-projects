const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmailValid(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, `${getFieldName(input)} not valid`)
    }
}

function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, `${getFieldName(input2)} does not match ${getFieldName(input1)}`)
    }
}

function getFieldName(input) {
    const label = input.parentElement.querySelector('label');
    return label.textContent;
}


// Check required field
function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}


// Check length
function checkLength(input, minLength, maxLength) {
    if (input.value.length < minLength) {
        showError(input, `${getFieldName(input)} must be atleast ${minLength} characters`);
    } else if (input.value.length > maxLength) {
        showError(input, `${getFieldName(input)} must be less than ${maxLength} characters`);
    } else {
        showSuccess(input);
    }
}

// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 6, 13);
    checkLength(password, 6, 20);
    checkEmailValid(email);
    checkPasswordMatch(password, password2);
});