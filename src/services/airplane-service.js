const { AirplaneRepository } = require("../repositories")

const airplaneRepository = new AirplaneRepository(); 

class AirplaneService{
    constructor(){

    };

    async createAirplane (data) {
        try {
            const response = await airplaneRepository.create(data);
            return response;
        } catch (error) {
            console.log("Error in airplane-service: createAirplane");
            throw error;
        }
    }
    async deleteAirplane (data) { //data for now is id, later destructure the data
        try {
            const response = await airplaneRepository.destroy(data);
            return response;
        } catch (error) {
            console.log("Error in airplane-service: createAirplane");
            throw error;
        }
    }
}

module.exports = AirplaneService;