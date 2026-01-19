const jwt = require('jsonwebtoken');
const User = require('../schemas/User');
const { verifyToken } = require('../utils/tokenUtils');
const logger = require('../utils/logger');
const { sendError } = require('../utils/responseHandlers');

/**
 * Protected Routes ==> Requires Authentication
 */
const protect = async (req, res, next) => {
    try {
        //1. Get token from headers
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        //2. check if token exists
        if(!token) {
            return sendError(res, 'Access denied, No token provided', 401);
        }

        //3. Verify Token
        let decoded;
       
        try {
            decoded = verifyToken(token);
        } catch (error) {
            if(error.name === 'TokenExpiredError') {
                return sendError(res, 'Token has expired, please login again', 401);
            }

            if(error.name === 'JsonWebTokenError') {
                return sendError(res, 'Invalid token, please login again', 401);
            }
            return sendError(res, 'Invalid token', 401);
        }

        //4. Check if user still exists
        const user = await User.findById(decoded.userId);
        if(!user) {
            return sendError(res, 'User not found, please login again', 404);
        }

        //5. check if user still active
        if(!user.isActive) {
            return sendError(res, 'User is not active, contact admin', 403);
        }

        req.user = user;
        next();

    } catch (error) {
        logger.error('Error in auth middleware:', error);
        return sendError(res, 'Not authorized to access this route', 403);
    }
}

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!req.user) {
            return sendError(res, 'Please login to access this resource', 401);
        }

        if(!roles.includes(req.user.role)) {
            return sendError(res, 'You do not have permission to perform this action', 403);
        }
        next();
    }
}

module.exports = {
    protect,
    restrictTo  
}

