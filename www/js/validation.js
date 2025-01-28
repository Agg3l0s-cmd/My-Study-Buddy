const form = document.getElementById('signupForm');
const fname = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repeat-password');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    let errors = [];

    if (fname){
        console.log('signup form');
        errors = getSignupFormErrors(fname, email, password, repassword)
    }
    else{
        console.log('login form');
        errors = getLoginFormErrors(email.value, password.value)
    }

    if (errors.length > 0) {
        console.log('Errors found:', errors);
        e.preventDefault();
        let pdm = 0;
        errors.forEach(element => {
            if(element === "Passwords do not match"){
                pdm = 1;
            }
            if(element === "Password must be at least 8 characters long"){
                pdm = 2;
            }
        });

        if(pdm === 1){
            error_message.textContent = "Passwords do not match!";
        }
        else if(pdm === 2){
            error_message.textContent = "Password must be at least 8 characters long!";
        }
        else{
            error_message.textContent = "Underneath fields are required!";
        }
        
    } else {
        console.log('No errors found, form will be submitted');
    }

});

function getSignupFormErrors(fname, email, password, repassword){
    let errors = [];

    if (fname.value === '' || fname.value === null){
        errors.push('Name');
        fname.parentElement.classList.add('incorrect');
    }

    if (email.value === ''|| email.value === null){
        errors.push('Email');
        email.parentElement.classList.add('incorrect');
    }

    if (password.value === ''|| password.value === null){
        errors.push('Password');
        password.parentElement.classList.add('incorrect');
    }

    if (password.value.length < 8){
        errors.push('Password must be at least 8 characters long');
        password.parentElement.classList.add('incorrect');
    }

    if (password.value !== repassword.value){
        errors.push('Passwords do not match');
        password.parentElement.classList.add('incorrect');
        repassword.parentElement.classList.add('incorrect');
    }

    return errors;
}

const allInputs = [fname, email, password, repassword];
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect');
            error_message.textContent = '';
        }
    });
});