const formEl = document.forms[0];
const inputYearEl = formEl.year;
const inputTitleEl = formEl.title;
const inputContentEl = formEl.content;
//---------------------------
const btnEl = document.querySelector('#create-btn');
const token = localStorage.getItem('articlesToken');

const errEl = document.getElementById('err');
//----------------------------
// if (!token) {
//   window.location.replace('login.html');
// }

//----------------------------

btnEl.addEventListener('click', (e) => {
  e.preventDefault();
  // console.log('click');
  const newArticleOb = articleString();
  //   console.log(newArticleOb);
  if (
    inputContentEl.value.length < 1 ||
    inputTitleEl.value.length < 1 ||
    inputYearEl.value.length < 1
  ) {
    errEl.textContent = 'Uzpildykite visus ivedimo laukus';
    return;
  }

  addArticle(newArticleOb);
});

function articleString() {
  const articleObj = {
    date: inputYearEl.value,
    title: inputTitleEl.value,
    content: inputContentEl.value,
  };
  return articleObj;
}

async function addArticle(newArticle) {
  const resp = await fetch('http://localhost:3000/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newArticle),
  });
  const atsinJs = await resp.json();
  console.log(atsinJs);
  // window.location.href = 'index.html';
}
