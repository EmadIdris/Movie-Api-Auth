'use strict';

require('dotenv').config();

// requ db

const {db}= require('./src/models/index')
// console.log(db);
const server = require('./src/server')

db.sync().then(()=>{
    server.start(process.env.PORT || 3030)
})
