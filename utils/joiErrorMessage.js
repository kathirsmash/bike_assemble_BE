
class JoiErrorMessage {

    convertJoiErrors = (joiErrors = []) => {
        joiErrors = joiErrors.map(error => {
            return {
                message: error.message,
                field: error.context.key
            };
        });
        if (joiErrors.length === 1) {
            return joiErrors[0];
        }
        return joiErrors;
    }
}

module.exports = new JoiErrorMessage();