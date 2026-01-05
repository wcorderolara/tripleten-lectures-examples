function formatTimeStamp() {
    return new Date().toISOString();
}

function info(message) {
    console.log(`[INFO] [${formatTimeStamp()}]: ${message}`);
}


function error(message) {
    console.error(`[ERROR] [${formatTimeStamp()}]: ${message}`);
}

function debug(message) {
    if(process.env.DEBUG === 'true') {
        console.debug(`[DEBUG] [${formatTimeStamp()}]: ${message}`);
    }
}

module.exports = {
    info,
    error,
    debug
}

