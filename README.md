# mongo-sample

mongoose で MongoDB に接続してあれやこれやする

## 環境変数

.env を作成して読み込む

```
DB_USER=<MongoDBユーザ名>
DB_PASS=<MongoDBパスワード>
```

## server.js

メインのファイル

- express の起動
- MongoDB との接続
- ルータの読み込み
  を行なっている。

## models

MongoDB に格納するデータのスキーマを定義する。
NoSQL の良いところで、DB 側でテーブル定義を変更しなくてもクライアント側(表現合ってる?)  
で定義したデータを柔軟に格納できる。  
mongoose の Schema に JSON を渡すとスキーマができる。

```
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
```

こいつを model メソッドに渡してモデルとして定義  
export して後で使う

```
const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
```

## routes

よくあるルーティングのところ

```
const express = require("express");
const app = express();
```

としてから

```
app.get()
app.post()
```

とかする。
実際の処理もここに書いたりする。
NestJS では、service に分割していた。

これ書かないと json と認識せずに、model で require と定義した値が読み取れずエラーになるので注意

```
// json形式でデータを扱うことを宣言する
app.use(express.json());
```
