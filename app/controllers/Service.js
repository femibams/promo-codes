const Response = require('../core/lib/response_manager');
const HttpStatus = require('../constants/httpStatus');
const Service = require("../models/service.js");
const UserService = require("../models/user_services.js");

const createService = async(req, res) => {
    const data = req.body;

    if(!data.name) {
        return Response.failure(res, {
            message: 'Name is required'
        }, HttpStatus.BadRequest);
    }

    // Create a Service
    const service = new Service({
        name: data.name,
        description: data.description,
        promocode: data.promocode
    });

    // Save Service in the database
    Service.create(service, (err, data) => {
        if (err) {
            return Response.failure(res, {
                message: 'Something went wrong',
                response: err
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return Response.success(res, {
                message: "Service saved successfully",
                response: data
            }, HttpStatus.CREATED);
        }
    });
}

const searchService = async(req, res) => {
    serviceParam = req.query;
    
    if(!serviceParam.page || !serviceParam.size) {
        serviceParam.page = 1;
        serviceParam.size = 10;
    }

    Service.find(serviceParam, (err, data) => {
        if (err) {
            return Response.failure(res, {
                message: 'Something went wrong',
                response: err
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return Response.success(res, {
                message: data.length ? "Service found" : "No Service found",
                response: data
            }, HttpStatus.OK);
        }
    });
}

const activateBonus = async(req, res) => {
    const { service_id } = req.body;
    console.log('user', req.user.user_id)
    
    let user_id = req.user.user_id

    if(!service_id) {
        return Response.failure(res, {
            message: 'Service Id is required'
        }, HttpStatus.BadRequest);
    }

    // Create a UserService
    const user_service = new UserService({
        user_id: user_id,
        service_id: service_id,
        active: '1'
    });

    // Save UserService in the database
    UserService.create(user_service, (err, data) => {
        if (err) {
            return Response.failure(res, {
                message: 'Something went wrong',
                response: err
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return Response.success(res, {
                message: "Bonus activated successfully",
                response: data
            }, HttpStatus.CREATED);
        }
    });
}

module.exports = {
    createService,
    searchService,
    activateBonus
}
