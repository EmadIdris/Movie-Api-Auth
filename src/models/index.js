'use strict';

require('dotenv').config();

// user schema 
const userSchema = require('./users')
//movie
const moviesSchema = require('./movies/model')
// collection
const Collection = require('./data-collection')
//======================================
const DATABASE_URL = process.env.NODE_ENV="test" ? 'sqlite:memory' : process.env.DATABASE_URL;
//======================================
const {Sequelize , DataTypes} = require('sequelize');
//======================================

//Heroku
let DATABASE_CONFIG= process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: { 
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {}; 
//======================================

let sequelize = new Sequelize(DATABASE_URL,DATABASE_CONFIG);

// let moviesModel = moviesSchema(sequelize,DataTypes);
// let userModel = userSchema(sequelize,DataTypes);
// let movieCollection = new Collection(moviesModel)

let movies = moviesSchema(sequelize,DataTypes)


module.exports ={
    db:sequelize,
    users: userSchema(sequelize,DataTypes),
    movies:new Collection(movies)
}