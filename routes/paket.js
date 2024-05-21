//import library
const express = require("express"); //const : variabel tetap
const app = express();

//import model
const model = require("../models/index");
const paket = model.paket;

const auth = require("../auth")
app.use(auth)

//endpoint menampilkan semua data paket, method: GET, function: findAll()
app.get("/", (req, res) => {
  paket
    .findAll()
    .then((result) => {
      res.json({
        paket: result,
        count: result.length,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint untuk menampilkan data paket berdasarkan id
app.get("/:id", (req, res) => {
  paket
    .findOne({ where: { id_paket: req.params.id } })
    .then((result) => {
      res.json({
        paket: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint untuk menyimpan data paket, METHOD: POST, function: create
app.post("/", async (req, res) => {
  let data = {
    image: req.body.image,
    nama_paket: req.body.nama_paket,
    harga: req.body.harga,
  };

  await paket
    .create(data)
    .then((result) => {
      res.json({
        message: "data has been inserted",
        result: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint mengupdate data paket, METHOD: PUT, function:update
app.put("/:id", (req, res) => {
  const id = req.params.id;
  let data = {
    nama_paket: req.body.nama_paket,
    jenis: req.body.jenis,
    harga: req.body.harga,
  };
  paket
    .update(data, { where: { id_paket: id } })
    .then((result) => {
      res.json({
        message: "data has been updated",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint menghapus data paket, METHOD: DELETE, function: destroy
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  paket
    .destroy({ where: { id_paket: id } })
    .then((result) => {
      res.json({
        message: "data has been deleted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

module.exports = app;
