const { StatusCodes } = require("http-status-codes");
const argon2 = require('argon2');

const User = require("../database/models/user.model");
const { successResponseHandler, errorResponseHandler } = require('../handlers/responseHandlers');
const { userCreatedSuccessfully } = require('../config/responseMessages/successMessages.json')
const { userAlreadyExists, pleaseProvideAValidPassword, somethingWentWrong, missingRequiredParams } = require('../config/responseMessages/errorMessages.json');
const { signUpParams } = require('../config/requiredParams.json')
const { validateParams } = require("../handlers/commonHandlers");
 
const authController = {}

authController.signup = async (req, res) => {
    try {
        const bodyParams = req.body;
        const missingParams = validateParams(signUpParams, bodyParams);

        if(missingParams.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(`${missingRequiredParams}${missingParams.join(", ")}`));
        }
        let hashPassword = null;
        if(bodyParams.password){
            hashPassword = await argon2.hash(bodyParams.password);
        } else {
            return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(pleaseProvideAValidPassword));
        }
        const { data, isCreated } = await User.findOrCreate({ where:{ email: bodyParams.email } , defaults: {...bodyParams, password: hashPassword }});
        if(!isCreated) {
            return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(userAlreadyExists));
        }

        return res.status(StatusCodes.CREATED).send(successResponseHandler(userCreatedSuccessfully, data));
    } catch (error) {
        console.error("Error in authController:signup", error);
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(somethingWentWrong, error));
    }
}

module.exports = authController;