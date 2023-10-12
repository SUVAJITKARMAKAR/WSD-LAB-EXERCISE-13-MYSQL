const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

async function getNotes() {
  try {
    const [rows] = await pool.query('SELECT * FROM notes2');
    return rows;
  } catch (error) {
    throw error;
  }
}

(async () => {
  try {
    const notes = await getNotes();
    console.log(notes);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    pool.end();
  }
})();
