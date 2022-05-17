const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

// ------------------------------------------------------
async function validateUser(req, res, next) {
  // validuoti gauta email ir password
  const schema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().trim().email().lowercase().required(),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().trim().min(5).max(10).required(),
  });

  try {
    // abortEarly default true - rodyti tik pirma rasta klaida
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error ===', error);
    res.status(400).json(error.details);
  }
}
// -------------------------------------------------------- Token
async function validateToken(req, res, next) {
  console.log('req.headers', req.headers);
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];
  // nera tokeno
  if (!tokenFromHeaders) {
    res.status(401).json({
      success: false,
      error: 'nera tokeno',
    });
    return;
  }
  // tokenas yra
  try {
    const tokenPayload = jwt.verify(tokenFromHeaders, jwtSecret);
    console.log('tokenPayload', tokenPayload);
    const usersId = tokenPayload.usersId;
    // budas perduoti userId i tolimesne funkcija
    req.usersId = usersId;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      error: 'blogas tokenas',
    });
  }
}
// ---------------------------------------------------------
// --------------------------------------------------------
module.exports = {
  validateUser,
  validateToken,
};
