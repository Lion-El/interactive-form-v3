# interactive-form-v3

An interactive and dynamic registration form for a fictional Full Stack conference. Showcasing customized and conditional behavior. Providing form validation error indications at the moment they occur.

There are many coding features to this application. The focus of this read me will be on real-time error messages, visual validation errors, conditional error messages and form validation.

## Real-Time Error Messages

#### Key-up Event Listener

```JavaScript
form.addEventListener('keyup', (e) => {
    function validator(valid, element) {
        visualValidation[valid.toString()]['input'](element, element.id);
    }
    validator(formValidation[e.target.id](e.target.value), e.target);
});
```
The above code first invokes a validation function within the event listener passing in two arguments. The first argument invokes an external method passing in user input. The external method is one of several methods within an object that gets invoked via the event target ID and corresponding property name.

#### Regex Validation
```JavaScript
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
```
The user input is passed into the corresponding property/method, validated via regular expression then returned as a boolean.

```JavaScript
form.addEventListener('keyup', (e) => {
    function validator(valid, element) {
        visualValidation[valid.toString()]['input'](element, element.id);
    }
    validator(formValidation[e.target.id](e.target.value), e.target);
});
```
The second argument that gets passed is the input element. Visual validation is then invoked within the validator function. The visual validation is an object with two nested objects, each with a method to handle valid (true) and invalid (false) user input. 

#### Visual Validation
```JavaScript
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
```
These two functions provide all the user feedback based on the input apart from the condition error messaging which is invoked with either an empty field or incorrect format.

#### Conditional Error Messaging

```JavaScript
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
```
There are four arguments that tie all these features together:
* The user input for validation
* The boolean value for validation and branching
* The target element for traversing the DOM 
* The element ID for branch/property/method selection 

## Form Validation

```JavaScript
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
```

The above code uses the same process as the previous one, but cannot access target elements in the same way. To avoid traversing the DOM the element selection is made as narrow as possible, looped and validation invoked, separating input elements that are not included. The checkbox validation is invoked separately as the argument being passed is not the same and validation gets handled differently.

#### Checkbox Validation

Returns true if any boxes are checked or false at the end of the loop.

```JavaScript
activities: activity => {
        for (let i=0; i < activity.length; i++) {
            if (activity[i].checked) {
                return true;
            } else if (i === activity.length-1) {
                return false;
            }
        }
    }
```


