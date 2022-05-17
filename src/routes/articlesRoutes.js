const express = require('express');
const { validateToken } = require('../middleWare');
const { getAllArticlesDB, postAllArticlesDB } = require('../model/usersModel');

// ------------------------------------

const articlesRoutes = express.Router();

// ------------------------------------get /articles
articlesRoutes.get('/articles', validateToken, async (req, res) => {
  if (req.usersId) {
    console.log('Gauti tik sio autoriaus str.', req.usersId);
  }
  try {
    const allUsers = await getAllArticlesDB();
    res.json(allUsers);
  } catch (error) {
    console.log('Klaida getAllArticlesDB', error);
    res.sendStatus(500);
  }
});
// ------------------------------------ post /articles
articlesRoutes.post('/articles', validateToken, async (req, res) => {
  try {
    const newArticleObj = req.body;
    const createArticleResult = await postAllArticlesDB(newArticleObj);
    if (createArticleResult.affectedRows === 1) {
      res.status(201).json('Jums pasiseke');
      return;
    }
    res.status(400).json('Nepavyko sukurti straipsnio');
  } catch (error) {
    res.sendStatus(500);
    // console.log('Klaida get authors stack', error.stack);
  }
});
// ------------------------------------

module.exports = articlesRoutes;
