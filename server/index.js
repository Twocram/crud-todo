const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
  console.log(`server running at 3001 port`);
});
