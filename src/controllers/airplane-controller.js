const { StatusCodes } = require("http-status-codes");

const {SuccessResponse, ErrorResponse} = require("../utils/common")
const { AirplaneService } = require("../services");
const airplaneService = new AirplaneService();

//here only the logic to handle incoming data and outgoing data

/**
 * POST : /airplanes
 * req.body {modelNumber: "airbus320", capacity : 200}
 */
async function createAirplane(req, res) {
    try {
        const airplane = await airplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body?.capacity || 0,
        });

        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        // console.log("Eror in controller", error);
        ErrorResponse.error = error;
        res.status(error.statusCode)
        .json(ErrorResponse);
    }
}
    
module.exports = {
    createAirplane,
}