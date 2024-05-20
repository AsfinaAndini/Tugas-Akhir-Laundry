//import auth
const auth = require("../auth");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "MOKLETHEBAT";

//import library
const express = require("express");
const bodyParser = require("body-parser");
const md5 = require("md5");

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import model
const model = require("../models/index");
const user = model.user;

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let findUser = await user.findOne({ where: { username } });

  if (!findUser) {
    return res.status(400).json({ msg: "Invalid credentials." });
  }

  if (md5(password) !== findUser.password) {
    return res.status(400).json({ msg: "Invalid credentials." });
  }

  const token = jwt.sign(
    JSON.parse(JSON.stringify(findUser)),
    SECRET_KEY,
    {
      expiresIn: 3600,
    }
  );
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    // secure: true,
    sameSite: "none",
  });

  res.json({
    token,
    user: {
      id: findUser.id,
      username: findUser.username,
      role: findUser.role,
      nama: findUser.nama,
    },
  });
})

//endpoint menampilkan semua data user, method: GET, function: findAll()
app.get("/", (req, res) => {
  user
    .findAll()
    .then((result) => {
      res.json({
        user: result,
        count: result.length,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//menampilkan data user berdasarkan id
app.get("/:id_user", (req, res) => {
  user
    .findOne({ where: { id_user: req.params.id_user } })
    .then((result) => {
      res.json({
        user: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint untuk menyimpan data user, METHOD: POST, function: create
app.post("/", (req, res) => {
  let data = {
    nama: req.body.nama,
    username: req.body.username,
    password: md5(req.body.password),
    role: req.body.role,
  };

  user
    .create(data)
    .then((result) => {
      res.json({
        message: "data has been inserted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint mengupdate data user, METHOD: PUT, function:update
app.put("/:id", (req, res) => {
  let param = {
    id_user: req.params.id,
  };
  let data = {
    nama: req.body.nama,
    username: req.body.username,
    password: md5(req.body.password),
    role: req.body.role,
  };
  user
    .update(data, { where: param })
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

//endpoint menghapus data user, METHOD: DELETE, function: destroy
app.delete("/:id", (req, res) => {
  let param = {
    id_user: req.params.id,
  };
  user
    .destroy({ where: param })
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

//login
app.post("/auth", async (req, res) => {
  let params = {
    username: req.body.username,
    password: md5(req.body.password),
  };

  let result = await user.findOne({ where: params });
  if (result) {
    let payload = JSON.stringify(result);
    // generate token
    let token = jwt.sign(payload, SECRET_KEY);
    res.json({
      logged: true,
      data: result,
      token: token,
    });
  } else {
    res.json({
      logged: false,
      message: "Invalid username or password",
    });
  }
});

module.exports = app;
