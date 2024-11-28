const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5001;
/*
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});*/

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
