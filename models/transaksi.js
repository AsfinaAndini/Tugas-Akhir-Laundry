"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "id_user",
        as: "user",
      });
    }
  }
  transaksi.init(
    {
      id_transaksi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_paket: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kode_invoice: DataTypes.STRING,
      customer: DataTypes.STRING,
      tgl: DataTypes.DATE,
      qty: DataTypes.DOUBLE,
      total_harga: DataTypes.DOUBLE,
      status: DataTypes.ENUM("baru", "proses", "selesai", "diambil"),
      status_bayar: DataTypes.ENUM("dibayar", "belum"),
    },
    {
      sequelize,
      modelName: "transaksi",
      tableName: "transaksi",
    }
  );
  return transaksi;
};
