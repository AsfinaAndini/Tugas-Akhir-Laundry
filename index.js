//import
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

//implementasi
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//endpoint user
const user = require('./routes/user');
app.use("/user", user)

//endpoint paket
const paket = require('./routes/paket');
app.use("/paket", paket)

//endpoint transaksi
const transaksi = require('./routes/transaksi');
app.use("/transaksi", transaksi)

//run server
app.listen(8080, () => {
  console.log("server run on port 8080");
});
