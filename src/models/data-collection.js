'use strict';

class Collection{
    constructor(model){
        this.model=model
    }
    //read
   async get(id){
        if(id){
            return await this.model.findOne({where:{id}}) 
        }else{
            return await this.model.findAll()
        }
    }
    //create
    async create(record){
        return await this.model.create(record)
    }
    //update By Id
    async update(id,data){
        return await this.model.findOne({where:{id}}).then (record => record.update(data));
    }
    //delete By Id
    async delete(id){
        return await this.model.destroy({where:{id}})
    }
}
module.exports = Collection