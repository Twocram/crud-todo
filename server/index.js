const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.listen(3001, () => {
  console.log(`server running at 3001 port`);
});
