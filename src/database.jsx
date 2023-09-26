const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tintinwaliatin@gmail.com',
  password : '012345',
  database : 'database.js'
});

dbConnection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});
