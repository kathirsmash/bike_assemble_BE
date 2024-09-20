const DB_MODEL = require('./../utils/dbModel');
const dbService = require('./../services/db');
const dbConnection = require('./../models');
const responseMessages = require('./../utils/responseMessages');
const commonService = require('./../services/common');

class AuthController {

    login = async (req, res) => {
        try {
            const payload = req.body;
            const findUser = await dbService.findOne(
                dbConnection,
                DB_MODEL.USER.MODEL,
                { username: payload.username }
            );
            if (!findUser) {
                return res.badRequest({ message: responseMessages[4006] });
            }
            const result = await commonService.comparePassword(payload.password, findUser.password);
            if (!result) {
                return res.badRequest({ message: responseMessages[4006] });
            }
            const accessToken = commonService.genetrateAccessToken(findUser);
            return res.ok({
                message: responseMessages[4007],
                data: {
                    ...JSON.parse(JSON.stringify(findUser)),
                    accessToken 
                }
            });
        } catch (error) {
            return res.internalServerError({
                error: error,
                message: responseMessages[4008]
            });
        }
    }

}

module.exports = new AuthController();
