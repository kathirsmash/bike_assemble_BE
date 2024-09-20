const { bcrypt, jwt } = require('./../utils/package');
const config = require('./../config');

class CommonService {

    encryptPassword = async (plainText) => {
        try {
            const salt = await bcrypt.genSaltSync(config.bcryptSaltRound);
            const decryptedText = await bcrypt.hashSync(plainText, salt);
            return decryptedText;
        } catch (error) {
            throw error;
        }
    }

    comparePassword = async (plainText, decryptedText) => {
        try {
            const result = await bcrypt.compare(plainText, decryptedText);
            return result;
        } catch (error) {
            throw error;
        }
    }

    genetrateAccessToken = (data) => {
        try {
            const accessToken = jwt.sign({
                expiresIn: config.jwtExpireTime,
                data: data
            }, config.jwtSecretKey);
            return accessToken;
        } catch (error) {
            throw error;
        }
    }

    verifyToken = (token) => {
        try {
            const verifiedResp = jwt.verify(token, config.jwtSecretKey);
            return verifiedResp;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new CommonService();