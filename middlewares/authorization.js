const responseMessages = require('../utils/responseMessages');

const veriyRole = (roles) => {
    return async (req, res, next) => {
        try {
            if (!roles.includes(req.loginUser.type)) {
                return res.forbidden({ message: responseMessages[4010] });
            }
            next();
        } catch (err) {
            return res.forbidden({ message: responseMessages[4010] });
        }
    };
};

module.exports = veriyRole;
