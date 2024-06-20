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

module.exports = commonHandlers;