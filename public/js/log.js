import { clearErrorsArr, checkInput, errorsArr } from './modules/validations.js';

const formEl = document.getElementById('login');
const baseUrl = 'http://localhost:3000/login';

const errroEl = document.getElementById('err');
const emailEl = formEl.elements.email;
const passEl = formEl.elements.password;

// ----------------------------------------------------------Valid select
const errorMsgElementsArr = document.querySelectorAll('.error-msg');

// ----------------------------------------------------
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
  console.log('js submit form');
  const loginObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  console.log('loginObj ===', loginObj);
  // ------------------------------------------------
  clearErrors();
  checkInput(loginObj.email, 'email', ['required', 'minLength-4', 'email', 'include-@.']);
  checkInput(loginObj.password, 'password', ['required', 'minLength-5', 'maxLength-10']);
  console.log('FE errorsArr ===', errorsArr);
  // --------------------------------------------------
  // jei yra klaidu FE tada nesiunciam uzklausos
  if (errorsArr.length) {
    handleError(errorsArr);
    return;
  }
  // --------------------------------------------
  const resp = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);

  if (dataInJs.success === true) {
    console.log('login success');
    errroEl.textContent = '';

    const { token } = dataInJs;
    localStorage.setItem('articlesToken', token);

    window.location.replace('index.html');
  } else {
    console.log('login fail');
    handleError(dataInJs);
  }
});
// ---------------------------------------------------
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
// --------------------------------------ClearErrors
function clearErrors() {
  // errorsArr = [];
  clearErrorsArr();
  errorMsgElementsArr.forEach((htmlElement) => {
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}
// const errrors = [
//   { message: '"email" is not allowed to be empty', field: 'email' },
//   { message: '"password" is not allowed to be empty', field: 'password' },
// ];
