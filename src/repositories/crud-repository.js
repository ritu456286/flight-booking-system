const { StatusCodes } = require("http-status-codes");
const { Logger} = require("../config");
const AppError = require("../utils/errors/app-error");

class CrudRepository{
    constructor(model){
        this.model = model; //model is the data model like User, Product, etc.
    }


    async create(data){
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data){ //data is the id
        const response = await this.model.destroy({
            where: {
                id: data,
            },
        });

        if(!response){
            throw new AppError("Unable to find the resource", StatusCodes.NOT_FOUND);
        }

        return response;         
    }

    async get(data){ //data is primary key
        const response= await this.model.findByPk(data);
        if(!response){
            throw new AppError("Unable to find the resource", StatusCodes.NOT_FOUND);
        }
        return response;
    }  

    async getAll(){
        const response = await this.model.findAll();
        return response;      
    }
    
    async update(id, data){ //data is object  { col: val, ...}
        const response = await this.model.update(data, {
            where: {
                id: id,
            }
        });
        return response;
    }
}

module.exports = CrudRepository;