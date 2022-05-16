const formEl = document.getElementById('register');
const baseUrl = 'http://localhost:3000/register';

const errroEl = document.getElementById('err');

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('js submit form');

  const regObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
    repPassword: formEl.elements.repeat_password.value.trim(),
  };
  if (
    formEl.elements.password.value.trim() !== formEl.elements.repeat_password.value.trim()
  ) {
    handleError('data incorrect: password error');
    return;
  }
  registerFetch(regObj.email, regObj.password);
});

function handleError(msg) {
  errroEl.textContent = '';
  if (typeof msg === 'string') {
    errroEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((errorOb) => {
      errroEl.innerHTML += `${errorOb.message}<br>`;
    });
  }
}

async function registerFetch(email, password) {
  const registerObj = { email, password };
  const resp = await fetch(baseUrl, {
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
    handleError(await resp.json());
  }
}
