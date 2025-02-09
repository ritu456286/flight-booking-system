const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const airplaneRepository = new AirplaneRepository(); 

class AirplaneService{
    constructor(){

    };

    async createAirplane (data) {
        try {
            const response = await airplaneRepository.create(data);
            return response;
        } catch (error) {
           
            if(error.name === "SequelizeValidationError"){
                let explaination = [];
                error.errors.forEach((err) => explaination.push(err.message));
                
                throw new AppError(explaination, StatusCodes.BAD_REQUEST);
            }
            throw new AppError("Cannot create a new Airplane object", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAirplanes(){
        try {
            const airplanes = await airplaneRepository.getAll();
            return airplanes;
        } catch (error) {
            throw new AppError("Cannot fetch data of all airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async getAirplane(id){
        try {
            const airplane = await airplaneRepository.get(id);
            return airplane;
        } catch (error) {
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new AppError("The airplane you requested is not present", error.statusCode)
            }
            throw new AppError("Cannot fetch the data of the given airplane", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteAirplane (id) { //data for now is id, later destructure the data
        try {
            const response = await airplaneRepository.destroy(id);
            return response;
        } catch (error) {
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new AppError("The airplane you requested to delete is not present", error.statusCode)
            }
            throw new AppError("Unable to delete the airplane", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async updateAirplane(id, data){
        try {
            const response = await airplaneRepository.update(id, data);
            return response;
        } catch (error) {
            if(error.statusCode === StatusCodes.NOT_FOUND) {
                throw new AppError("The airplane you requested to update is not present", error.statusCode)
            }
            throw new AppError("Unable to update the airplane", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = AirplaneService;