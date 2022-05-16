const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const { getAllUsersDB, addUserToDb, findUserByEmail } = require('../model/usersModel');
const { jwtSecret } = require('../config');
const { validateUser } = require('../middleWare');

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
userRoute.post('/register', validateUser, async (req, res) => {
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

// -------------------------------

userRoute.post('/login', validateUser, async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await findUserByEmail(email);
  if (!foundUser) {
    res.status(400).json('email or password not found (email)');
    return;
  }
  if (!bcrypt.compareSync(password, foundUser.password)) {
    res.status(400).json('email or password not found (pass)');
    return;
  }
  const payload = { usersId: foundUser.id };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
  res.json({ success: true, token });
});

// -----------------------------

// ----------------------------
module.exports = userRoute;
