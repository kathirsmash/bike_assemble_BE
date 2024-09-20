const { joi } = require('./../utils/package');

const productionLogSchema = joi.object({
    bikeId: joi.string().required()
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

class BikeValidator {

    saveProductionLog = async (req, res, next) => {
        const { error, validatedData } = await validateMethod(productionLogSchema, req.body);
        if (error) return res.badRequest(error);
        return next();
    }

}

module.exports = new BikeValidator();
