const mongoose = require("mongoose");

const nonNegativeNumber = (value) => {
  if (value < 0) throw new Error("マイナスの値は不正です");
};

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, //空白削除
    lowercase: true,
  },
  tags: {
    type: [String],
    trim: true,
  },
  rate: {
    type: Number,
    validate(value) {
      nonNegativeNumber(value);
    },
  },
  calories: {
    type: Number,
    defauld: 0,
    validate(value) {
      nonNegativeNumber(value);
    },
  },
});

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
