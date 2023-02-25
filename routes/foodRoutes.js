const express = require("express");
const app = express();
const foodModel = require("../models/Food");

// json形式でデータを扱うことを宣言する
app.use(express.json());

// データの取得
app.get("/foods", async (req, res) => {
  // databaseの中のデータを全て返す
  // Food.jsを使う
  console.log(req.query);
  const foods = await foodModel.find({});
  try {
    res.send(foods);
  } catch (err) {
    res.status(500).send(err);
  }
});

// データの取得
app.get("/foods/:tags", async (req, res) => {
  // databaseの中のデータを全て返す
  // Food.jsを使う
  const tags = req.params.tags.split(",");
  console.log(tags);
  const foods = await foodModel.find({ tags: { $in: tags } });
  try {
    res.send(foods);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/food", async (req, res) => {
  const food = new foodModel(req.body);
  try {
    await food.save();
    res.send(food);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/food/:id", async (req, res) => {
  try {
    await foodModel.findByIdAndUpdate(req.params.id, req.body);
    await foodModel.save();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/food/:id", async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
