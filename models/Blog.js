const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
    // add properites here, ex:
    title: {
         type: DataTypes.STRING,
         allowNull:false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull:false,
   }
},{
    sequelize
});

module.exports = Blog;