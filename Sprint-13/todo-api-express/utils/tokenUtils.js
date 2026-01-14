const jwt = require('jsonwebtoken');

const generateToken = (user) => {

    return jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d'
        }
    )
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const getExpirationDate= (expiresIn) => {
    // 1s , 1m, 1h, 1d // 4b
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if(!match) {
        return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // default 7 days
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const multipliers = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000
    };

    return new Date(Date.now() + value * multipliers[unit]);
};

module.exports = {
    generateToken,
    verifyToken,
    getExpirationDate
}