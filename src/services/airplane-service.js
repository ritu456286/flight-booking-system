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

    
    async deleteAirplane (data) { //data for now is id, later destructure the data
        try {
            const response = await airplaneRepository.destroy(data);
            return response;
        } catch (error) {
            // console.log("Error in airplane-service: createAirplane");
            throw error;
        }
    }
}

module.exports = AirplaneService;