'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.pesanan,{
      //   foreignKey: "userID", as: "userPesanan"
      // })
    }
  }
  user.init({
    id_user: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: DataTypes.STRING,
    nama: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('owner', 'staff')
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};