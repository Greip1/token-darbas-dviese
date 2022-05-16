const express = require('express');
const { getAllUsersDB } = require('../model/usersModel');

// -------------------------------
const userRoute = express.Router();

// -----------------------------

userRoute.get('/users', async (req, res) => {
  try {
    const allUsers = await getAllUsersDB();
    res.json(allUsers);
  } catch (error) {
    console.log('Klaida getUsers', error.stack);
    res.sendStatus(500);
  }
});
// -----------------------------

userRoute.post('/register', async (req, res) => {});

// ----------------------------
module.exports = userRoute;
