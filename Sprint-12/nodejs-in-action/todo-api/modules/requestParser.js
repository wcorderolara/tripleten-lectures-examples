const logger = require('../utils/logger');

const MAX_BODY_SIZE = 1024 * 1024; // 1MB

function parseBody(req) {
    return new Promise( (resolve, reject) => {
        if(req.method === 'GET' || req.method === 'DELETE') {
            resolve(null);
            return;
        }

        const contentType = req.headers['content-type'];
        const chunks = [];
        let totalSize = 0;

        req.on('data', (chunk) => {
            totalSize += chunk.lenght;

            if(totalSize > MAX_BODY_SIZE) {
                req.destroy();
                reject(new Error('Payload too large'));
                return;
            }

            chunks.push(chunk);
        });

        req.on('end', () => {
            const bodyString = Buffer.concat(chunks).toString();

            if(!bodyString) {
                resolve(null);
                return;
            }

            if(contentType.includes('application/json')) {
                try {
                    const data = JSON.parse(bodyString);
                    resolve(data);
                } catch (error) {
                    reject(new Error('Invalid JSON'));
                }
            }else {
                resolve(bodyString);
            }
        });

        req.on('error', (error) => {
            logger.error(`Error parsing body: ${error.message}`);
            reject(error);
        })
    })
}

module.exports = {parseBody};

