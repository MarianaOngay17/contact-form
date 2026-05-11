document.addEventListener('DOMContentLoaded', async function(){
    const submit = document.querySelector('.form__submit');

    submit.addEventListener('click', function(e){
        e.preventDefault();
        validateForm();
    });

});

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function validateForm(){
    hideError();
    const firstNameInput = document.querySelector('#first-name');
    const lastNameInput = document.querySelector('#last-name');
    const emailInput = document.querySelector('#email');
    const radioInput = document.querySelector('input[type="radio"]:checked');
    const messageInput = document.querySelector('#message');
    const consentInput = document.querySelector('#consent-cb');
    
    var flag = true;
    var arrayErrors = [];
    var inputErrors = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(firstNameInput.value == ""){ flag = false; arrayErrors.push('#first-name-error'); inputErrors.push(firstNameInput); }
    if(lastNameInput.value == ""){ flag = false; arrayErrors.push('#last-name-error'); inputErrors.push(lastNameInput)}
    if(emailInput.value == "" ||  !emailPattern.test(emailInput.value)){
        flag = false; 
        arrayErrors.push('#email-error'); 
        inputErrors.push(emailInput)
    }
    if(radioInput == null){ flag = false; arrayErrors.push('#query-error');}
    if(messageInput.value == ""){ flag = false; arrayErrors.push('#message-error'); inputErrors.push(messageInput)}
    if(!consentInput.checked){ flag = false; arrayErrors.push('#consent-error');}

    if(flag){
        cleanInputs();
        success();
    } else{
        showError(arrayErrors, inputErrors)
    }
}

function showError(arrayErrors, inputErrors){
    arrayErrors.forEach(element => {
        const span = document.querySelector(element)
        span.classList.remove('hidden')
    });

    inputErrors.forEach(element => {
        element.classList.add('error');
    });
}

function hideError(){
    document.querySelectorAll('.form__error').forEach(element => {
        element.classList.add('hidden');
    })

    document.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });

}

async function success(){
    const success = document.querySelector('.success');

    success.classList.remove('hidden');
    success.focus();
    success.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });

    await esperar(3000);

    success.classList.add('hidden')
}

function cleanInputs(){
    const firstNameInput = document.querySelector('#first-name');
    const lastNameInput = document.querySelector('#last-name');
    const emailInput = document.querySelector('#email');
    const radioInput = document.querySelector('input[type="radio"]:checked');
    const messageInput = document.querySelector('#message');
    const consentInput = document.querySelector('#consent-cb');

    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    radioInput.checked = false;
    messageInput.value = "";
    consentInput.checked = false;
}

