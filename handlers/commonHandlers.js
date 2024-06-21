const jwt = require('jsonwebtoken');
const sequelize = require('../database/connection');

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

commonHandlers.executeSqlQuery = async (query, replacements)=>{
    try {
        const [result] = await sequelize.query(query, { replacements });
        return result;
    } catch (error) {
        console.log("Error in commonHandlers:executeSqlQuery", error);
        return error;
    }
}

module.exports = commonHandlers;