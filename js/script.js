const nameInput = document.getElementById('name');
const jobRoleInput = document.getElementById('other-job-role');
const jobRoleSelection = document.getElementById('title');
const colorSelection = document.getElementById('color');
const designTheme = document.getElementById('design');
const activities = document.getElementById('activities');
const paymentOptions = document.getElementById('payment');
const payMethod = paymentOptions.getElementsByTagName('option');
const creditCard = document.querySelector('.credit-card-box');
const paypalSection = document.getElementById('paypal');
const bitcoinSection = document.getElementById('bitcoin');
const form = document.querySelector('form');
let totalCost = 0;


//default styles/values
window.addEventListener('load', () => {
    nameInput.focus();
    jobRoleInput.style.display = 'none';
    colorSelection.setAttribute('disabled', '');
    paymentOptions.querySelector('[value="credit-card"]').selected = true;
    paypalSection.style.display = 'none';
    bitcoinSection.style.display = 'none';
})


//display/hide text input
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

form.addEventListener('submit', (e) => {
    
});