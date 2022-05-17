const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// --------------------------
async function duomenuSiuntimasGavimasIsDb(sql, dataToDBArr) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [rezult] = await conn.execute(sql, dataToDBArr);
    return rezult;
  } catch (error) {
    console.log('Klaida eduomenuSiuntimasGavimasIsDb', error);
    throw new Error('Klaida eduomenuSiuntimasGavimasIsDb');
  } finally {
    conn?.end();
  }
}
// --------------------------
async function getAllUsersDB() {
  const sql = 'SELECT * FROM users';
  return duomenuSiuntimasGavimasIsDb(sql, []);
}
// -----------------------------
async function addUserToDb(email, password) {
  const sql = `
    INSERT INTO users(email, password)
    VALUES (?, ?)
    `;
  return duomenuSiuntimasGavimasIsDb(sql, [email, password]);
}
// --------------------------------------------
async function findUserByEmail(email) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = `
      SELECT * FROM users WHERE email = ? 
      `;
    const [result] = await conn.execute(sql, [email]);
    return result[0];
  } catch (error) {
    console.log('error findUserByEmail', error);
    return false;
  } finally {
    conn?.end();
  }
}
// ---------------------------------------------Articles
async function getAllArticlesDB() {
  const sql = 'SELECT * FROM articles';
  return duomenuSiuntimasGavimasIsDb(sql, []);
}
// ---------------------------------------------
async function postAllArticlesDB(insObj) {
  const { date, title, content } = insObj;
  const sql = `
    INSERT INTO articles(date, title, content)
    VALUES (?, ?, ?)
    `;
  return duomenuSiuntimasGavimasIsDb(sql, [date, title, content]);
}
// -------------------------------------------
module.exports = {
  getAllUsersDB,
  addUserToDb,
  findUserByEmail,
  getAllArticlesDB,
  postAllArticlesDB,
};
