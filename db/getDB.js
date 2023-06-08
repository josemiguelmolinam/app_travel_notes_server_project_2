const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

let pool;

const getDB = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'demo',
        password: '123456',
        database: 'notes',
        timezone: 'Z',
      });
    }

    return await pool.getConnection();
  } catch (err) {
    console.error(err);
  }
};

module.exports = getDB;
