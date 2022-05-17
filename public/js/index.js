//  gauti token is localStorage
// grazinti i login.html jei tokeno nera
// fetch data ir sudet i index html

import { getFetch } from './modules/fetch.js';

const token = localStorage.getItem('articlesToken');
const destEl = document.getElementById('list');

if (!token) {
  window.location.replace('login.html');
}

// --------------------------------------------
async function getBooks(userToken) {
  const articlesArr = await getFetch('articles', userToken);
  console.log(articlesArr);
  renderArticles(articlesArr, destEl);
}
getBooks(token);
// -------------------------------------------
function renderArticles(arr, dest) {
  dest.innerHTML = '';
  arr.forEach((bObj) => {
    const liEl = document.createElement('li');
    liEl.textContent = `${bObj.date} - ${bObj.title}-${bObj.content}`;
    dest.append(liEl);
  });
}
