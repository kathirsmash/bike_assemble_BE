const responseMessages = require('../utils/responseMessages');
const commonService = require('./../services/common');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.unAuthorized({ message: responseMessages[4009] });
        }
        const token = authHeader.split(' ')[1];
        const verifiedResp = commonService.verifyToken(token);
        req.loginUser = verifiedResp.data;
        return next();
    } catch (err) {
        return res.unAuthorized({ message: responseMessages[4009] });
    }
};

module.exports = verifyToken;
