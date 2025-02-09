const { Logger} = require("../config")

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
        return response;         
    }

    async get(data){ //data is primary key
        const response= await this.model.findByPk(data);
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
    }
}

module.exports = CrudRepository;