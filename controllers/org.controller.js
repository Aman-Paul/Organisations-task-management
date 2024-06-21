const { StatusCodes } = require('http-status-codes');

const { executeSqlQuery } = require('../handlers/commonHandlers');
const { getOrgList } = require('../config/nativeQueries.json');
const { errorResponseHandler, successResponseHandler } = require('../handlers/responseHandlers');
const { somethingWentWrong } = require('../config/responseMessages/errorMessages.json');
const { orgListFoundSuccessfully } = require('../config/responseMessages/successMessages.json');

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

module.exports = orgController;