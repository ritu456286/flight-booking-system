const { StatusCodes } = require("http-status-codes");

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
            capacity: req.body.capacity,
        });
        return res
                .status(StatusCodes.CREATED)
                .json({
                    success: true,
                    msg: "Successfully created an airplane",
                    data: airplane,
                    error: {},
                })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            success: false,
            msg: "Something went wrong while creating the airplane",
            data: {},
            error: error,
        })
    }
}

module.exports = {
    createAirplane,
}