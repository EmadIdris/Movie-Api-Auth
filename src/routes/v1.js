'use strict';

const express= require('express');
const v1Routes = express.Router();
const models = require('../models')

v1Routes.param('model',(req,res,next)=>{
    const modelName = req.params.model;
    if(models[modelName]){
        req.model = models[modelName];
        next();
    }else{next('invalid Model')}
});

// routes
v1Routes.get('/:model', handleAll) // get
v1Routes.get('/:model/:id', handleOne) // get
v1Routes.post('/:model', handleCreate) // get
v1Routes.put('/:model/:id', handleUpdate) // get
v1Routes.delete('/:model/:id', handleDelete) // get

async function handleAll(req,res){
    let allData = await req.model.get();
    res.status(200).json(allData)
}

async function handleOne(req,res){
    const id = req.params.id
    let allData = await req.model.get(id);
    res.status(201).json(allData)
}
async function handleCreate(req,res){
    const obj = req.body
    let allData = await req.model.create(obj);
    res.status(201).json(allData)
}
async function handleUpdate(req,res){
    const id = req.params.id
    const obj = req.body
    let allData = await req.model.update(id,obj);
    res.status(201).json(allData)
}
async function handleDelete(req,res){
    const id = req.params.id
    let allData = await req.model.delete(id);
    res.status(201).json(allData)
}
module.exports =v1Routes;