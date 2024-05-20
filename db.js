'use_strich'

const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "laundry"
})

module.exports = db;