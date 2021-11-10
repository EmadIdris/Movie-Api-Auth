'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

// Routes
const authRoutes = require('./routes/auth')
const v1Routes = require('./routes/v1')
const v2Routes = require('./routes/v2')
//
//

const app = express();

// use 
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extend:true}));

// route use 
app.use(authRoutes)
app.use('/v1',v1Routes)
app.use('/v2',v2Routes)


app.get('/',(req,res)=>{
    res.status(200).send('API IS Working')
})

// use error-handler
app.use('*',notFoundHandler) //localhost:3030/hasgdh =>{ }
app.use(errorHandler); // in postman (therw new error)

module.exports={
    server:app,
    start : port =>{
        app.listen(port,()=> console.log(`server is Runnig on ${port}`));
    }
}