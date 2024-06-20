const responseHanders = {};

responseHanders.successResponseHandler = (message = "", data = {}, success = true ) => {
    return {
        message: message,
        success: success,
        data: data
    }
}

responseHanders.errorResponseHandler = (message = "", data = {}, success = false) => {
    return {
        message: message,
        success: success,
        data: data
    }
}

module.exports = responseHanders;
