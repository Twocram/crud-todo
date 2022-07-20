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

app.post('/api/users/create', (req, res) => {
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

app.get('/api/users/:name&:password', (req, res) => {
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

app.post('/api/todos/create', (req, res) => {
  db.query('INSERT INTO todos (title, id_user) VALUES (?, ?)', [
    req.body.title,
    req.body.id_user,
  ]),
    (err, result) => {
      if (err) {
        throw new Error(err);
      } else {
        res.send('Task created');
      }
    };
});

app.get('/api/todos/:id_user', (req, res) => {
  db.query(
    'SELECT * FROM todos WHERE id_user = ?',
    [req.params.id_user],
    (err, result) => {
      if (err) {
        throw new Error(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/api/todos/:id&:id_user', (req, res) => {
  db.query('DELETE FROM todos WHERE id = ? AND id_user = ?', [
    req.params.id,
    req.params.id_user,
  ]);
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT} port`);
});
