'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transaksi", {
      id_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kode_invoice: {
        type: Sequelize.STRING,
      },
      id_paket: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "paket",
          key: "id_paket",
        },
      },
      customer: {
        type: Sequelize.STRING
      },
      tgl: {
        type: Sequelize.DATE,
      },
      qty: {
        type: Sequelize.DOUBLE,
      },
      total_harga: {
        type: Sequelize.DOUBLE,
      },
      status: {
        type: Sequelize.ENUM("baru","proses","selesai","diambil")
      },
      status_bayar: {
        type: Sequelize.ENUM("dibayar","belum")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transaksi');
  }
};