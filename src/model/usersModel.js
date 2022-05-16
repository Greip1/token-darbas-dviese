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

module.exports = {
  getAllUsersDB,
};
