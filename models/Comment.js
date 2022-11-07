const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    // add properites here, ex:
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    comment: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    commenter: {
        type: DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize
});

module.exports = Comment;