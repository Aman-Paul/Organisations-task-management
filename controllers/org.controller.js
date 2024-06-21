const { StatusCodes } = require('http-status-codes');

const Org = require('../database/models/org.model');
const { executeSqlQuery, validateParams } = require('../handlers/commonHandlers');
const { getOrgList } = require('../config/nativeQueries.json');
const { errorResponseHandler, successResponseHandler } = require('../handlers/responseHandlers');
const { somethingWentWrong, missingRequiredParams } = require('../config/responseMessages/errorMessages.json');
const { orgListFoundSuccessfully, orgCreatedSuccessfully } = require('../config/responseMessages/successMessages.json');
const { createOrgParams } = require('../config/requiredParams.json')

const orgController = {};

orgController.getOrgList = async (req, res) => {
    try {
        const orgList = await executeSqlQuery(getOrgList, [req.user.id]);
        
        res.status(StatusCodes.OK).send(successResponseHandler(orgListFoundSuccessfully, orgList));
        
    } catch (error) {
        console.log("Error in orgController:getOrgList", error);
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(somethingWentWrong, error));
    }
}

orgController.createOrg = async (req, res) => {
    try {
        let bodyParams = req.body;
        const missingParams = validateParams(createOrgParams, bodyParams);

        if(missingParams.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(`${missingRequiredParams}${missingParams.join(", ")}`));
        }
        bodyParams['ownerId'] = req.user.id;

        let org = await Org.create(bodyParams);
        delete org.dataValues.id;
        org.dataValues['orgId'] = org.uniqueId;
        delete org.dataValues.uniqueId;
        org.ownerId = req.user.uniqueId;

        res.status(StatusCodes.CREATED).send(successResponseHandler(orgCreatedSuccessfully, org));
        
    } catch (error) {
        console.log("Error in orgController:createOrg", error);
        return res.status(StatusCodes.BAD_REQUEST).send(errorResponseHandler(somethingWentWrong, error));
    }
}

module.exports = orgController;