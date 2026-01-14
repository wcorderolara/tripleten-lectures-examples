function sendJson(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}

function sendSuccess(res, data, statusCode = 200) {
    sendJson(res, statusCode, {success: true, data})
}

function sendError(res, message, statusCode = 500) {
    sendJson(res, statusCode, {success: false, error: message})
}

function sendCreated(res, data, statusCode = 201) {
    sendJson(res, statusCode, {success: true, data, message: 'Todo created successfully'})
}

module.exports = {
    sendJson,
    sendSuccess,
    sendError,
    sendCreated
}