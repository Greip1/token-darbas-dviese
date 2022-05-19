//  gauti token is localStorage
// grazinti i login.html jei tokeno nera
// fetch data ir sudet i index html

import { getFetch } from './modules/fetch.js';

const token = localStorage.getItem('articlesToken');

const cardGridContainerEl = document.querySelector('.card-grd-container');

// --------------------------
if (!token) {
  window.location.replace('login.html');
}

// --------------------------------------------
async function getBooks(userToken) {
  const articlesArr = await getFetch('articles', userToken);
  console.log(articlesArr);
  if (articlesArr.success === false) {
    alert('Neaktyvus vartotojas, prasome');
    window.location.replace('login.html');
  }
  //   renderArticles(articlesArr, destEl);
  cardGridContainerEl.textContent = '';
  renderArticles(articlesArr);
}
getBooks(token);

// ---------------------------------------------

function creatEl(tag, text, clas, dest) {
  const newEl = document.createElement(tag);
  newEl.textContent = text;
  newEl.className = clas;
  dest.append(newEl);
  return newEl;
}
//---------------------------------------------

function renderArticles(arr) {
  arr.forEach((articleObj) => {
    createArticle(articleObj);
  });
}
// -------------------------------------------

function createArticle(obj) {
  const cardEl = creatEl('div', '', 'card', cardGridContainerEl);
  creatEl('h5', obj.date, 'year', cardEl);
  creatEl('hr', '', '', cardEl);
  creatEl('h4', obj.title, 'title', cardEl);
  creatEl('p', obj.content, 'content', cardEl);
}
