// check token 
'use strict';

const {users} = require('../models/index');
module.exports = async(req,res,next)=>{
    try {
        if(!req.headers.authorization){next("invalid login")} // not equal 
        const token = req.headers.authorization.split(' ')[1] //bearer asdgihagdasgkdjk 
        const validUser = await users.authenticateToken(token);
        req.user= validUser;
        req.token= validUser.token;
        next();
    } catch (error) {
        next(error.message);
    }
}