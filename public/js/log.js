const formEl = document.getElementById('login');
const baseUrl = 'http://localhost:3000/login';

const errroEl = document.getElementById('err');

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('js submit form');
  const loginObj = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  console.log('loginObj ===', loginObj);
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
    localStorage.setItem('bookUserToken', token);

    // window.location.replace('index.html');
  }
  //  ====================================================================
  else {
    console.log('login fail');
    handleError(dataInJs);
  }
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
