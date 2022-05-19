import { clearErrorsArr, checkInput, errorsArr } from './modules/validations.js';

const formEl = document.getElementById('register');
const baseUrl = 'http://localhost:3000';

const errroEl = document.getElementById('err');

const emailErr = document.getElementById('emailError');
const passErr = document.getElementById('passError');
const emailEl = formEl.elements.email;
const passEl = formEl.elements.password;
// ----------------------------------------------------------Valid select
const errorMsgElementsArr = document.querySelectorAll('.error-msg');

// formEl.elements.password.addEventListener('change', (e) => {
//   e.preventDefault();
//   console.log(formEl.elements.password.value.length);
//   if (formEl.elements.password.value.length < 6) {
//     formEl.elements.password.style.backgroundColor = 'rgb(224, 89, 93)';
//   } else {
//     formEl.elements.password.style.backgroundColor = 'rgb(143, 231, 143)';
//   }
//   if (formEl.elements.repeat_password.value.length < 6) {
//     formEl.elements.repeat_password.style.backgroundColor = 'rgb(224, 89, 93)';
//   } else {
//     formEl.elements.repeat_password.style.backgroundColor = 'rgb(143, 231, 143)';
//   }
// });

//--------------------------------------------
// emailEl.addEventListener('blur', (event) => {
//   clearErrors();
//   const el = event.currentTarget;
//   checkInput(el.value, el.name, ['required', 'minLength-4', 'email']);
//   handleError(errorsArr);
// });

emailEl.addEventListener('input', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-4', 'email', 'include-@']);
  handleError(errorsArr);
});
passEl.addEventListener('input', (event) => {
  clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-5', 'maxLength-10']);
  handleError(errorsArr);
});
// ----------------------------------------------------

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();

  const regObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
    repPassword: formEl.elements.repeat_password.value.trim(),
  };
  // if (formEl.elements.email.value.length < 5) {
  //   handleError('Data incorrect: please check your email');
  //   return;
  // }
  // if (
  //   formEl.elements.password.value.trim() !== formEl.elements.repeat_password.value.trim()
  // ) {
  //   handleError('Data incorrect: password error');
  //   return;
  // }
  // if (formEl.elements.password.value.length < 6) {
  //   handleError('Data incorrect: password is too short');
  //   return;
  // }
  clearErrors();
  checkInput(regObj.email, 'email', ['required', 'minLength-4', 'email', 'include-@.']);
  checkInput(regObj.password, 'password', ['required', 'minLength-5', 'maxLength-10']);
  console.log('FE errorsArr ===', errorsArr);
  // --------------------------------------------------
  // jei yra klaidu FE tada nesiunciam uzklausos
  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }

  //----------------------------------------------
  registerFetch(regObj.email, regObj.password);
});

function handleError(msg) {
  errroEl.textContent = '';
  if (typeof msg === 'string') {
    errroEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    // paprastas budas avaizduoti visas klaidas
    // msg.forEach((eObj) => {
    //   errroEl.innerHTML += `${eObj.message}<br>`;
    // });
    // atvaizduoti individualias klaidas
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}
// -----------------------------------------------------
async function registerFetch(email, password) {
  const registerObj = { email, password };
  const resp = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  });
  if (resp.status === 201) {
    // success
    handleError('registration successful');
  } else {
    // fail
    const res = await resp.json();
    console.log(res);
    handleError(res);
  }
}
// -------------------------------------------------
function clearErrors() {
  // errorsArr = [];
  clearErrorsArr();
  errorMsgElementsArr.forEach((htmlElement) => {
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
