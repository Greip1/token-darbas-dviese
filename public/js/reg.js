const formEl = document.getElementById('register');
const baseUrl = 'http://localhost:3000';

const errroEl = document.getElementById('err');

const emailErr = document.getElementById('emailError');
const passErr = document.getElementById('passError');

formEl.elements.password.addEventListener('change', (e) => {
  e.preventDefault();
  console.log(formEl.elements.password.value.length);
});

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();

  const regObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
    repPassword: formEl.elements.repeat_password.value.trim(),
  };
});

function handleError(msgArrErr) {
  errroEl.textContent = '';

  if (typeof msgArrErr === 'string') {
    errroEl.textContent = msgArrErr;
  }
  if (Array.isArray(msgArrErr)) {
    passErr.innerHTML = '';
    emailErr.innerHTML = '';
    msgArrErr.forEach((errorOb) => {
      console.log('errorOb.path', errorOb.path[0]);
      if (errorOb.path[0] === 'email') {
        const pEl = document.createElement('p');
        pEl.textContent = errorOb.message;
        emailErr.append(pEl);
      }
      if (errorOb.path[0] === 'password') {
        const pEl = document.createElement('p');

        pEl.textContent = errorOb.message;
        passErr.append(pEl);
      }
    });
  }
}

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
