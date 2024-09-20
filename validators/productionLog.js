const { joi } = require('../utils/packages');

const saveProductionLogSchema = joi.object({
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

class ProductionLogValidator {

    saveProductionLog = async (req, res, next) => {
        const { error, validatedData } = await validateMethod(saveProductionLogSchema, req.body);
        if (error) return res.badRequest(error);
        return next();
    }

}

module.exports = new ProductionLogValidator();
