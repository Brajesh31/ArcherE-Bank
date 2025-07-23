const mysql = require('mysql');
require('dotenv').config();

const mysqlconnection = mysql.createConnection({
  host     : process.env.DB_HOST || 'localhost',
  user     : process.env.DB_USER || 'root',
  password : process.env.DB_PASSWORD || '',
  database : process.env.DB_NAME || 'archerbank'
});

mysqlconnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('the mysql connection is working');
});

exports.mysqlconnection = mysqlconnection;