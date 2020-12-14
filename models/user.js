'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    Name: DataTypes.STRING,
    Phone: DataTypes.INTEGER,
    Email: DataTypes.STRING, 
    University: DataTypes.STRING,
    Grad_year: DataTypes.INTEGER,
    First_Workshop: DataTypes.STRING,
    Second_Workshop: DataTypes.STRING,      
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};