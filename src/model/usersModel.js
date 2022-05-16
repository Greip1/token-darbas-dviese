const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

// ----------------------------
// async function getArryFromDB(sql) {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const [rezult] = await conn.execute(sql, []);
//     return rezult;
//   } catch (error) {
//     console.log('Klaida getArryFromDB', error);
//     throw new Error('Klaida getArryFromDB');
//   } finally {
//     conn?.end();
//   }
// }
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
// ---------------------------------------------
module.exports = {
  getAllUsersDB,
  addUserToDb,
  findUserByEmail,
};
