'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { DataTypes } = require('sequelize/types');
require('dotenv').config();

const SECRET = process.env.SECRET || "anything"

// schema user

const userSchema = (sequelize,DataTypes) =>{
    const model = sequelize.define('Users',{
        username:{
            type : DataTypes.STRING , required : true , unique : true
        },
        password:{
            type : DataTypes.STRING , required : true 
        },
        role:{
            type : DataTypes.ENUM('user', 'writer' , 'editor' , 'admin'),
            required : true,
            defaultValue : 'user'
        },
        token :{
            type : DataTypes.VIRTUAL,
            get(){
                return jwt.sign({username : this.username},SECRET)
            },
            set(tokenObj){
                let token = jwt.sign(tokenObj,SECRET);
                return token;
            }
        },
        capabilities :{
            type : DataTypes.VIRTUAL,
            get(){
                const acl = {
                    user   : ['read'],
                    writer : ['read', 'create'],
                    editor : ['read','create','update'],
                    admin  : ['read','create','update','delete'] 
                }
                return acl[this.role]
            }
        }
    });
    // username : emad
    // password : "12345"
    // before create db hashed password
    model.beforeCreate (async (user)=>{
        let hashedPass = await bcrypt.hash(user.password , 10)  //hash password (originalPassword , complixity)
        user.password = hashedPass; // 12345 =>  jsgadjh
    });

    model.beforeUpdate (async (user)=>{
        let hashedPass = await bcrypt.hash(user.password , 10)  //hash password (originalPassword , complixity)
        user.password = hashedPass; // 12345 =>  jsgadjh
    });
    //emad => asdaasd UN : emad
    //asdasd          PA :12345  // asdasd
    model.authenticateBasic = async function (username,password) {
        const user = await this.findOne({where :{username}})
        const valid = await bcrypt.compare(password,user.password) //123 // asdasd , asdasd
        if (valid){return user;} // if true => all info
        throw new Error("inValid User")
    }
    // username , pass , token => asdasdasdqwd
    // check token  , SECRET
    // emad => asjkdhjkasgdyi 
    // samah => lsadhyuiqwy
    model.authenticateToken = async function(token){
        try{
            // token => Sercet
            const parsedToken = jwt.verify(token,SECRET)  // Done // asjkdhjkasgdyi = anything
            // emad = asjkdhjkasgdyi
            const user = this.findOne({where :{username : parsedToken.username}}) //emad != lsadhyuiqwy
            if(user){return user}
            throw new Error ("User Not Found");
        } catch(e){
            throw new Error(e.message)
        }
    };
    return model;
}
module.exports=userSchema;

