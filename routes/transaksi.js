//import express
const express = require("express");
const app = express();
app.use(express.json());
const db = require("../db");

//import model
const models = require("../models/index");
const transaksi = models.transaksi;
const paket = models.paket;

const auth = require("../auth");
app.use(auth);

//Endpoint untuk menampilkan semua data transaksi
app.get("/", async (req, res) => {
  let result = await transaksi.findAll({
    include: [
      {
        model: paket,
        as: "paket",
      },
    ],
  });
  res.json({
    transaksi: result,
    count: result.length,
  });
});

//endpoint untuk menampilkan data transaksi berdasarkan id
app.get("/find/:id", async (req, res) => {
  let param = { id_transaksi: req.params.id };
  let result = await transaksi.findOne({
    where: param,
    include: [
      "member",
      "outlet",
      "user",
      {
        model: models.paket,
        as: "paket",
      },
    ],
  });
  res.json(result);
});

// //endpoint untuk menambahkan data transaksi baru
app.post("/", async (req, res) => {
  try {
    const date = new Date();
    const y = date.getFullYear();
    const m = ("0" + (date.getMonth() + 1)).slice(-2);
    const d = ("0" + date.getDate()).slice(-2);
    const h = ("0" + date.getHours()).slice(-2);
    const s = ("0" + date.getSeconds()).slice(-2);
    const i = ("0" + date.getMinutes()).slice(-2);
    const kode_invoice = `TA${y}${m}${d}${s}${i}`;
    const tgl = `${y}-${m}-${d} ${h}:${i}:${s}`;

    // Dapatkan harga jenis laundry
    const dataPaket = await paket.findByPk(req.body.id_paket);
    if (!dataPaket) return res.json("paket not found");
    const harga = dataPaket.harga;

    // Hitung total harga
    const total_harga = harga * req.body.qty;

    const data = {
      kode_invoice: kode_invoice,
      id_paket: req.body.id_paket,
      customer: req.body.customer,
      tgl: tgl,
      qty: req.body.qty,
      total_harga: total_harga,
      status: "baru",
      status_bayar: "belum",
    };
    await transaksi.create(data);

    res.json({
      message: "Data has been inserted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// endpoint update data transaksi
app.put("/status", (req, res) => {
  let id_transaksi = req.body.id_transaksi;
  let data = {
    status: req.body.status,
  };
  let sql = "update transaksi set ? where id_transaksi = ?";
  db.query(sql, [data, id_transaksi], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.json({
        message: `Successfully update transaction where id = ${id_transaksi}.`,
      });
    }
  });
});

// endpoint untuk menghapus data transaksi
app.delete("/:id_transaksi", async (req, res) => {
  let param = { id_transaksi: req.params.id_transaksi };
  try {
    await transaksi.destroy({ where: param });
    res.json({
      message: "data has been deleted",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

module.exports = app;
