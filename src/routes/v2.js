'use strict';

const express = require('express');
const v2Routes = express.Router();

const { users } = require('../models/index');
const bearerAuth = require('../middleware/bearer.js');
const permissions = require('../middleware/acl.js');
const dataModules = require('../models');

v2Routes.param('model', (req, res, next) => {
    const modelName = req.params.model;
    if (dataModules[modelName]) {
        req.model = dataModules[modelName];
        next();
    } else {
        next('Invalid Model');
    }
});

v2Routes.get('/:model', bearerAuth, handleGetAll);
v2Routes.get('/:model/:id', bearerAuth, handleGetOne);
v2Routes.post('/:model', bearerAuth, permissions('create'), handleCreate);
v2Routes.put('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
v2Routes.patch('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
v2Routes.delete('/:model/:id', bearerAuth, permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
    const id = req.params.id;
    let theRecord = await req.model.get(id)
    res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj)
    res.status(201).json(updatedRecord);
}

async function handleDelete(req, res) {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(204).json(deletedRecord);
}
module.exports = v2Routes;
