const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.post('/user/create', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  db.query(
    'INSERT INTO users (name, password) VALUES(?,?)',
    [name, password],
    (err, result) => {
      if (err) {
        throw new Error(err);
      } else {
        res.send('Values inserted');
      }
    }
  );
});

app.get('/users/:name&:password', (req, res) => {
  db.query(
    'SELECT * FROM users WHERE name = ? AND password = ?',
    [req.params.name, req.params.password],
    (err, result) => {
      if (err) {
        throw new Error(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT} port`);
});
