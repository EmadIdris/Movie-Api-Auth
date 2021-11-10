'use strict';

const express = require('express');
const authRoutes = express.Router();

const {users} = require('../models/index')

// middleware
const basic = require('../middleware/basic')
const bearer = require('../middleware/bearer')
const acl = require('../middleware/acl')

authRoutes.post('/signUp' , async (req,res,next)=>{
    try {
        let dataInJson =  req.body
        let userRecord = await users.create(dataInJson)
        const result = {
            user:userRecord, // contain username , password , role 
            token:userRecord.token // token 
        };
        res.status(201).json(result)
    } catch (error) {
        next(e.message)
    }
});
//==================================
authRoutes.post('/signIn',basic,async (req,res,next)=>{ // /signIn => basic (checking password , username , role) => print result
    const user = {
        user : req.user,
        token : req.user.token
    };
    res.status(200).json(user)
})
//===================================================
authRoutes.get('/users', bearer , acl("delete") , async(req,res,next)=>{ // checking token 
    // /users => bearer (check token) => print result
    const userData = await users.findAll({});
    const list = userData.map(user => {`${user.username} : ${user.role}`});
    res.status(200).json(list)
})
//=====================================================
authRoutes.get('/secret' , bearer , async(req,res,next)=>{
    res.status(200).send("Welcome to Secret Page ")
})
module.exports = authRoutes;
