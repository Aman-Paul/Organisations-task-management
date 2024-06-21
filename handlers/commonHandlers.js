const jwt = require('jsonwebtoken');

const commonHandlers = {};

commonHandlers.validateParams = (requiredParams, avalableParams) => {
    const missingParams = [];
    for (const param of requiredParams) {
        if (!avalableParams.hasOwnProperty(param)) {
            missingParams.push(param);
        }
    }
    return missingParams;
}

commonHandlers.signJwt = (userId, email) => {
    try {
        return jwt.sign({ sub: userId, email: email}, process.env.JWT_SECRET,{ expiresIn: '3d'});
    } catch (error) {
        console.log("Error in commonHandlers:signJwt", error);
    }
}
module.exports = commonHandlers;