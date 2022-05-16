const express = require('express');
const bcrypt = require('bcryptjs');
const { getAllUsersDB, addUserToDb } = require('../model/usersModel');
// -------------------------------
const userRoute = express.Router();

// -----------------------------

userRoute.get('/users', async (req, res) => {
  try {
    const allUsers = await getAllUsersDB();
    res.json(allUsers);
  } catch (error) {
    console.log('Klaida getUsers', error);
    res.sendStatus(500);
  }
});
// ------------------------------
userRoute.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
    };
    const insertResult = await addUserToDb(newUser.email, newUser.password);
    console.log('insertResult', insertResult);
    if (insertResult.affectedRows === false) {
      res.status(500).json('Bedos');
    }
    res.sendStatus(201).json('User created');
  } catch (error) {
    console.log();
    res.status(500).json('Nepavyko ipostinti UserRoute /register', error);
  }
});

//

// -----------------------------

userRoute.post('/register', async (req, res) => {});

// ----------------------------
module.exports = userRoute;
