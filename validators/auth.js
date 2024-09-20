const { joi } = require('./../utils/package');
const joiError = require('./../utils/joiErrorMessage');

const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
});

async function validateMethod(schemaName, dataToValidate) {
    try {
        const { error, value } = schemaName.validate(dataToValidate);
        return {
            error: (error ? joiError.convertJoiErrors(error.details) : ''),
            validatedData: value
        };
    } catch (error) {
        return {
            error
        };
    }
}

class AuthValidator {

    login = async (req, res, next) => {
        const { error, validatedData } = await validateMethod(loginSchema, req.body);
        if (error) return res.badRequest(error);
        return next();
    }

}

module.exports = new AuthValidator();
