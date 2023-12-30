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

// form validation
const validateName = name => {
    return /^[a-z]+$/i.test(name);
}
const validateEmail = email => {
    return /^[^@.][^@]+@[^@]+[.][a-z]+$/i.test(email);
}
const validateCardNumber = cardNumber => {
    return /^\d{13,16}$/.test(cardNumber);
}
const validateZipCode = zipCode => {
    return /^\d{5}$/.test(zipCode);
}
const validateCVV = security => {
    return /^\d{3}$/.test(security);
}
const validateActivity = {
    validate: element => {
        for (let i=0; i < element.length; i++) {
            if (element[i].checked) {
                return true;
            } else if (i === element.length-1) {
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
    let selection = e.target.value;
    if (selection === 'other') {
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
    if (e.target.checked) {
        totalCost += parseInt(dataCost);
        costDisplay.textContent = `Total: $${totalCost}`;
    } else {
        totalCost -= parseInt(dataCost);
        costDisplay.textContent = `Total: $${totalCost}`;
    }
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

// form validation and visual errors
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

    validator(validateName(nameInput.value), nameInput);
    validator(validateEmail(emailInput.value), emailInput);
    validator(validateActivity['validate'](checkbox), activities);
    validator(validateCardNumber(cardDetails[0].value), cardDetails[0]);
    validator(validateZipCode(cardDetails[1].value), cardDetails[1]);
    validator(validateCVV(cardDetails[2].value), cardDetails[2]);
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