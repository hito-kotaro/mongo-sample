const express = require("express");
const app = express();
const mongoose = require("mongoose");

const foodRouter = require("./routes/foodRoutes");

require("dotenv").config();
const env = process.env;

app.use(foodRouter);
// DBと接続
mongoose
  .connect(
    `mongodb+srv://${env.DB_USER}:${env.DB_PASS}@cluster0.gw0idwq.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connectiong"))
  .catch((err) => console.log(err));
app.listen(3000, () => {
  console.log(env.DB_USER);
  console.log("start server");
});
