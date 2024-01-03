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
const cardPaymentSection = document.getElementById('credit-card');
const ccNum = document.getElementById('cc-num');
const paypalSection = document.getElementById('paypal');
const bitcoinSection = document.getElementById('bitcoin');
const form = document.querySelector('form');
let totalCost = 0;

// default style values
window.addEventListener('load', () => {
    nameInput.focus();
    jobRoleInput.style.display = 'none';
    colorSelection.setAttribute('disabled', '');
    paymentOptions.querySelector('[value="credit-card"]').selected = true;
    paypalSection.style.display = 'none';
    bitcoinSection.style.display = 'none';
    ccNum.setAttribute('id', 'ccnum'); // prep for use as an object property
    ccNum.closest('label').setAttribute('for', 'ccnum');
});

// default error handling 
const formatingError  = {
    name: element => {
        element.nextElementSibling.innerText = 
        'Name field must be formatted correctly';
    },
    email: element => {
        element.nextElementSibling.innerText = 
        'Email address must be formatted correctly';
    },
    ccnum: element => {
        element.nextElementSibling.innerText = 
        'Credit card number must be between 13 - 16 digits';
    },
    zip: element => {
        element.nextElementSibling.innerText = 
        'Zip Code must be 5 digits';
    },
    cvv: element => {
        element.nextElementSibling.innerText = 
        'CVV must be 3 digits';
    }
}

// conditional error handling
const blankFieldError  = {
    name: element => {
        element.nextElementSibling.innerText = 
        'Name field cannot be blank';
    },
    email: element => {
        element.nextElementSibling.innerText = 
        'Email field cannot be blank';
    },
    ccnum: element => {
        element.nextElementSibling.innerText = 
        'Card number field cannot be blank';
    },
    zip: element => {
        element.nextElementSibling.innerText = 
        'Zip code cannot be blank';
    },
    cvv: element => {
        element.nextElementSibling.innerText = 
        'CVV cannot be blank';
    }
}

// form field validation
const formValidation  = {
    name: name => /^[a-z]+$/i.test(name),
    email: email => /^[^@.][^@]+@[^@]+[.][a-z.]{3,}$/i.test(email),
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

// visual validation
const visualValidation = {
    true: { 
        input: element => {
            if (element.parentNode.tagName === 'LABEL') {
                element.parentNode.classList.remove('not-valid');
                element.parentNode.classList.add('valid');
                element.nextElementSibling.style.display = 'none';
            } else {
                element.closest('fieldset').classList.remove('not-valid');
                element.closest('fieldset').classList.add('valid');
                element.lastElementChild.style.display = 'none';
            }
        }
    },
    false: { 
        input: (element, elementId) => {
            if (element.parentNode.tagName === 'LABEL') {
                element.parentNode.classList.remove('valid');
                element.parentNode.classList.add('not-valid');
                if (element.value === '') {
                    blankFieldError[elementId](element);
                    element.nextElementSibling.style.display = 'inherit';
                } else {
                    formatingError[elementId](element);
                    element.nextElementSibling.style.display = 'inherit';
                }
            } else {
                element.closest('fieldset').classList.remove('valid');
                element.closest('fieldset').classList.add('not-valid');
                element.lastElementChild.style.display = 'inherit';
            }
        }
    }
}

// display/hide text input
jobRoleSelection.addEventListener('change', (e) => {
    let jobSelection = e.target.value;
    if (jobSelection === 'other') {
        jobRoleInput.style.display = 'inline-block';
    } else {
        jobRoleInput.style.display = 'none';
    }
});

// enable/set color options
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

// Update total activites cost
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
                    cardPaymentSection.style.display = 'block';
                    break;
                case 'paypal':
                    cardPaymentSection.style.display = 'none';
                    bitcoinSection.style.display = 'none';
                    paypalSection.style.display = 'block';
                    break;
                case 'bitcoin':
                    cardPaymentSection.style.display = 'none';
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
        visualValidation[valid.toString()]['input'](element, element.id);
    }
    validator(formValidation[e.target.id](e.target.value), e.target);
});

// visual cofirmtion/errors on submition
form.addEventListener('submit', (e) => {
    function validator(valid, element) {
        visualValidation[valid.toString()]['input'](element, element.id);
        valid ? 'submission confirmed': e.preventDefault();
    }

    const textInput = form.querySelectorAll('input[id]');
    textInput.forEach(element => {
        const attributes = element.getAttributeNames();
        if (!attributes.includes('style')) {
            validator(formValidation[element.id](element.value), element);
        }
    });
    validator(formValidation['activities'](checkbox), activities);
});
// highlight field on focus
checkbox.forEach(element => {
    element.addEventListener('focus', (e) => {
        e.target.parentNode.classList.add('focus');
    });
});
// remove highlight
checkbox.forEach(element => {
    element.addEventListener('blur', (e) => {
        e.target.parentNode.classList.remove('focus');
    });
});