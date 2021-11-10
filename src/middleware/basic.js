// checking on pas and u
'use strict';

const base64 = require('base-64') // sadasd => 1324
const {users} = require('../models/index') 

module.exports=async(req,res,next)=>{
    if(!req.headers.authorization){ // not equal 
        return res.status(405).send("invalid");
        }; 
    console.log(111111111111,req.headers.authorization); //basic asdgihagdasgkdjk
    let basic = req.headers.authorization.split(' ')[1];  // [asdgihagdasgkdjk] bearer asdgihagdasgkdjk
    console.log(22222222222,basic);
    let [user , pass] = base64.decode(basic).split(':');

    try {
        req.user = await users.authenticateBasic(user,pass);
        next();
    } catch (error) {
        return res.status(405).send("invalid");
    }
}
