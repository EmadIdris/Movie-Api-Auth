'use strict';

const moviesSchema = (sequelize,DataTypes) => sequelize.define('Movies',{
    name:{
        type : DataTypes.STRING,
        required : true
    },
    year:{
        type : DataTypes.INTEGER,
        required : true
    },
    Category:{
        type : DataTypes.STRING,
        required : true
    },
    rateing:{
        type : DataTypes.INTEGER,
        required : true
    }
})
module.exports = moviesSchema