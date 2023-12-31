const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const jobRoleInput = document.getElementById('other-job-role');
const jobRoleSelection = document.getElementById('title');
const colorSelection = document.getElementById('color');
const designTheme = document.getElementById('design');
const activities = document.getElementById('activities');
const checkbox = activities.querySelectorAll('input');
const paymentOptions = document.getElementById('payment');
const payMethod = paymentOptions.getElementsByTagName('option');
const creditCard = document.querySelector('.credit-card-box');
const cardDetails = creditCard.getElementsByTagName('input');
const paypalSection = document.getElementById('paypal');
const bitcoinSection = document.getElementById('bitcoin');
const form = document.querySelector('form');
let totalCost = 0;

// form field validation object
const formValidation  = {
    name: name => /^[a-z]+$/i.test(name),
    email: email => /^[^@.][^@]+@[^@]+[.][a-z]+$/i.test(email),
    ccnum: cardNumber => /^\d{13,16}$/.test(cardNumber),
    zip: zipCode => /^\d{5}$/.test(zipCode),
    cvv: security => /^\d{3}$/.test(security),
    activities: activity => {
        for (let i=0; i < activity.length; i++) {
            if (activity[i].checked) {
                return true;
            } else if (i === activity.length-1) {
                return false;
            }
        }
    }
}

// default style values
window.addEventListener('load', () => {
    nameInput.focus();
    jobRoleInput.style.display = 'none';
    colorSelection.setAttribute('disabled', '');
    paymentOptions.querySelector('[value="credit-card"]').selected = true;
    paypalSection.style.display = 'none';
    bitcoinSection.style.display = 'none';
});

// display/hide text input
jobRoleSelection.addEventListener('change', (e) => {
    let jobSelection = e.target.value;
    if (jobSelection === 'other') {
        jobRoleInput.style.display = 'inline-block';
    } else {
        jobRoleInput.style.display = 'none';
    }
});

// enable/set color option
designTheme.addEventListener('change', () => {
    colorSelection.removeAttribute('disabled');
    const colorOption = document.querySelectorAll('option[data-theme]');
    colorOption.forEach(colorTheme => {
        designTheme.value !== colorTheme.getAttribute('data-theme') 
        ? colorTheme.hidden = true : colorTheme.hidden = false;
    });
    if (designTheme.value === 'js puns') {
        colorSelection.querySelector('[value="tomato"]').selected = false;
        colorSelection.querySelector('[value="cornflowerblue"]').selected = true;
    } else {
        colorSelection.querySelector('[value="cornflowerblue"]').selected = false;
        colorSelection.querySelector('[value="tomato"]').selected = true;
    }
});

// display total activites cost
activities.addEventListener('change', (e) => {
    const costDisplay = document.getElementById('activities-cost');
    const dataCost = e.target.getAttribute('data-cost');
    const targetDate = e.target.getAttribute('data-day-and-time');
    
    if (e.target.checked) {
        totalCost += parseInt(dataCost);
        costDisplay.textContent = `Total: $${totalCost}`;
    } else {
        totalCost -= parseInt(dataCost);
        costDisplay.textContent = `Total: $${totalCost}`;
    }
    
    checkbox.forEach(element => {
        const arrayDate = element.getAttribute('data-day-and-time');
        if (e.target.checked) {
            if (!element.checked && arrayDate === targetDate) {
                element.setAttribute('disabled', '');
                element.closest('label').classList.add('disabled');
            }
        } else {
            if (arrayDate === targetDate) {
                element.removeAttribute('disabled');
                element.closest('label').classList.remove('disabled');
            }
        }
        
    });
});

// hide/display payment option  
paymentOptions.addEventListener('change', () => {
    for (let i=1; i < payMethod.length; i++ ) {
        if (payMethod[i].value === paymentOptions.value) {
            switch (payMethod[i].value) {
                case 'credit-card':
                    paypalSection.style.display = 'none';
                    bitcoinSection.style.display = 'none';
                    creditCard.style.display = 'flex';
                    break;
                case 'paypal':
                    creditCard.style.display = 'none';
                    bitcoinSection.style.display = 'none';
                    paypalSection.style.display = 'block';
                    break;
                case 'bitcoin':
                    creditCard.style.display = 'none';
                    paypalSection.style.display = 'none';
                    bitcoinSection.style.display = 'block';
                    break;
                default:
                    return;
            }
        }
    }
});

// instant visual cofirmtion/errors
form.addEventListener('keyup', (e) => {
    function validator(valid, element) {
        console.log(element);
        if (valid) {
            if(element.parentNode.tagName === 'LABEL') {
                element.parentNode.classList.remove('not-valid');
                element.parentNode.classList.add('valid');
                element.nextElementSibling.style.display = 'none';
                console.log('we good!');
            } else {
                element.closest('fieldset').classList.remove('not-valid');
                element.closest('fieldset').classList.add('valid');
                element.lastElementChild.style.display = 'none';
                console.log('we good!');
            }
        } else {
            e.preventDefault();
            if (element.parentNode.tagName === 'LABEL') {
                element.parentNode.classList.remove('valid');
                if (element.value === '') {
                    element.parentNode.classList.add('not-valid');
                    element.nextElementSibling.innerText = 
                    'Name field cannot be blank';
                    element.nextElementSibling.style.display = 'inherit';
                } else {
                    element.parentNode.classList.add('not-valid');
                    element.nextElementSibling.innerText = 
                    'Please use alphabetic characters only';
                    element.nextElementSibling.style.display = 'inherit';
                }
                
            } else {
                element.closest('fieldset').classList.remove('valid');
                element.closest('fieldset').classList.add('not-valid');
                element.lastElementChild.style.display = 'inherit';
            }
        }
    }

    const property = e.target.getAttribute('id');
    validator(formValidation[property](e.target.value), e.target);
});

// visual cofirmtion/errors on submition
form.addEventListener('submit', (e) => {
    function validator(valid, element) {
        console.log(element);
        if (valid) {
            if(element.parentNode.tagName === 'LABEL') {
                element.parentNode.classList.remove('not-valid');
                element.parentNode.classList.add('valid');
                element.nextElementSibling.style.display = 'none';
                console.log('we good!');
            } else {
                element.closest('fieldset').classList.remove('not-valid');
                element.closest('fieldset').classList.add('valid');
                element.lastElementChild.style.display = 'none';
                console.log('we good!');
            }
        } else {
            e.preventDefault();
            if(element.parentNode.tagName === 'LABEL') {
                element.parentNode.classList.remove('valid');
                element.parentNode.classList.add('not-valid');
                element.nextElementSibling.style.display = 'inherit';
            } else {
                element.closest('fieldset').classList.remove('valid');
                element.closest('fieldset').classList.add('not-valid');
                element.lastElementChild.style.display = 'inherit';
            }
        }
    }

    validator(formValidation['name'](nameInput.value), nameInput);
    validator(formValidation['email'](emailInput.value), emailInput);
    validator(formValidation['activities'](checkbox), activities);
    validator(formValidation['ccnum'](cardDetails[0].value), cardDetails[0]);
    validator(formValidation['zip'](cardDetails[1].value), cardDetails[1]);
    validator(formValidation['cvv'](cardDetails[2].value), cardDetails[2]);
});

checkbox.forEach(element => {
    element.addEventListener('focus', (e) => {
        e.target.parentNode.classList.add('focus');
    });
});

checkbox.forEach(element => {
    element.addEventListener('blur', (e) => {
        e.target.parentNode.classList.remove('focus');
    });
});