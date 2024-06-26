const { StatusCodes } = require("http-status-codes");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require("../database/models/user.model");
const { successResponseHandler, errorResponseHandler } = require('../handlers/responseHandlers');
const { userCreatedSuccessfully, userSignInSuccessfully } = require('../config/responseMessages/successMessages.json')
const { userAlreadyExists, somethingWentWrong, missingRequiredParams, noSuchUserFound } = require('../config/responseMessages/errorMessages.json');
const { signUpParams, signInParams } = require('../config/requiredParams.json')
const { validateParams, signJwt } = require("../handlers/commonHandlers");
 
const authController = {}

authController.signup = async (req, res) => {
    try {
        const bodyParams = req.body;
        const missingParams = validateParams(signUpParams, bodyParams);

        if(missingParams.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(`${missingRequiredParams}${missingParams.join(", ")}`));
        }
        const hashPassword = await argon2.hash(bodyParams.password);

        const [ data, isCreated ] = await User.findOrCreate({ where:{ email: bodyParams.email } , defaults: {...bodyParams, password: hashPassword }});
        if(!isCreated) {
            return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(userAlreadyExists));
        }

        const token = signJwt(data.id, data.email);
        const response = {
            access_token: token,
            email: data.email
        };

        return res.status(StatusCodes.CREATED).send(successResponseHandler(userCreatedSuccessfully, response));
    } catch (error) {
        console.error("Error in authController:signup", error);
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(somethingWentWrong, error));
    }
}


authController.signin = async (req, res) => {
    try {
        const bodyParams = req.body;
        const missingParams = validateParams(signInParams, bodyParams);

        if(missingParams.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(`${missingRequiredParams}${missingParams.join(", ")}`));
        }

        const user = await User.findOne({ where: { email: bodyParams.email }, attributes: ['id', 'uniqueId', 'email', 'password']});
        if(!user) {
            return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(noSuchUserFound));
        }

        const token = signJwt(user.id, user.email);
        const response = {
            access_token: token,
            email: user.email
        };

        return res.status(StatusCodes.OK).send(successResponseHandler(userSignInSuccessfully, response));
    } catch (error) {
        console.error("Error in authController:signin", error);
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(somethingWentWrong, error));
    }
} 
module.exports = authController;