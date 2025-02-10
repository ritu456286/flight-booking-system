const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const cityRepository = new CityRepository(); 

class CityService{
    constructor(){

    };

    async createCity (data) {
        try {
            const response = await cityRepository.create(data);
            return response;
        } catch (error) {
           
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError"){
                let explaination = [];
                error.errors.forEach((err) => explaination.push(err.message));
                
                throw new AppError(explaination, StatusCodes.BAD_REQUEST);
            }
            throw new AppError("Cannot create a new City object", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getCities(){
        try {
            const cities = await cityRepository.getAll();
            return cities;
        } catch (error) {
            throw new AppError("Cannot fetch data of all cities", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getCity(id){
        try {
            const response = await cityRepository.get(id);
            return response;
        } catch (error) {
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new AppError("The city you requested is not present", error.statusCode)
            }
            throw new AppError("Cannot fetch the data of the given city", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteCity (id) { //data for now is id, later destructure the data
        try {
            const response = await cityRepository.destroy(id);
            return response;
        } catch (error) {
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new AppError("The city you requested to delete is not present", error.statusCode)
            }
            throw new AppError("Unable to delete the city", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateCity(id, data){
        try {
            const response = await cityRepository.update(id, data);
            return response;
        } catch (error) {
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new AppError("The city you requested to update is not present", error.statusCode)
            }
            throw new AppError("Unable to update the city", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = CityService;