const Response = require('../core/lib/response_manager');
const HttpStatus = require('../constants/httpStatus');
const User = require("../models/user.js");
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {
    const data = req.body;

    if(!data.name || !data.password || !data.email) {
        return Response.failure(res, {
            message: 'Name, password and email are all required'
        }, HttpStatus.BadRequest);
    }

    await User.findAsync(data.email).then((res) => {
        if(res.length == 1){
            return Response.failure(res, {
                message: 'User already exist, please login'
            }, HttpStatus.Conflict);
        }
    }).catch((err) => {
        return Response.failure(res, {
            message: 'Something went wrong',
            response: err
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    })

    encryptedPassword = await bcrypt.hash(data.password, 10);

    // Create a user
    const user = new User({
        name: data.name,
        email: data.email,
        password: encryptedPassword
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err) {
            return Response.failure(res, {
                message: 'Something went wrong',
                response: err
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            // Create token
            const token = jwt.sign(
                { user_id: data.id, email: data.email },
                config.jwt_key,
                {
                expiresIn: "2h",
                }
            );

            data.token = token

            return Response.success(res, {
                message: "Service saved successfully",
                response: data
            }, HttpStatus.CREATED);
        }
    });
}

const loginUser = async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return Response.failure(res, {
            message: 'Password and Email are both required'
        }, HttpStatus.BadRequest);
    }

    const user = await User.findAsync(email).then((data) => {
        if(data.length == 0){
            return Response.failure(res, {
                message: 'No account exists with this email! Please signup'
            }, HttpStatus.BadRequest);
        }

        return data[0];

    }).catch((err) => {
        return Response.failure(res, {
            message: 'Something went wrong',
            response: err
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    })

    console.log('user', user);
    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            { user_id: user.id, email },
            config.jwt_key,
            {
              expiresIn: "2h",
            }
        );

        user.token = token

        return Response.success(res, {
            message: "Logged in successfully",
            response: user
        }, HttpStatus.OK);
    }

    return Response.failure(res, {
        message: "Invalid credentials",
        response: []
    }, HttpStatus.BadRequest);
}

module.exports = {
    registerUser,
    loginUser
}
