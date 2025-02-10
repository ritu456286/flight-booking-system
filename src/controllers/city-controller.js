const { StatusCodes } = require("http-status-codes");

const {SuccessResponse, ErrorResponse} = require("../utils/common")
const { CityService } = require("../services");
const cityService = new CityService();

//here only the logic to handle incoming data and outgoing data

/**
 * POST : /cities
 * req.body {name: "delhi"}
 */
async function createCity(req, res) {
    try {
        const city = await cityService.createCity({
            name: req.body.name
        });

        SuccessResponse.data = city;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        
        ErrorResponse.error = error;
        return res.status(error.statusCode)
        .json(ErrorResponse);
    }
}
 
/**
 * GET: /cities
 * req.body: {}
 */
async function getCities(req, res) {
    try {
       

        const cities = await cityService.getCities();

        SuccessResponse.data = cities;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * GET : /cities/:id
 * req.body: {}
 */
async function getCity(req, res) {
    try {
        const city = await cityService.getCity(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * DELETE: /cities/:id
 * req.body: {}
 */
async function deleteCity(req, res) {
    try {
        const city = await cityService.deleteCity(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * PATCH: /cities/:id
 * req.body: {col: val, col: val..}
 */
async function updateCity(req, res) {
    try {
        // console.log(req.body);
        const city = await cityService.updateCity(req.params.id, req.body);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


module.exports = {
    createCity,
    getCities,
    getCity,
    deleteCity,
    updateCity,
}