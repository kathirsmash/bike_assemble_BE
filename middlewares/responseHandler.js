const STATUS_CODE = require('./../utils/statusCode');
const STATUS_MESSAGE = require('./../utils/statusMessage');

module.exports = () => {

    return async (req, res, next) => {

        /* 200 */
        res.success = ({ statusCode, message = null, data = null }) => {
            res.status(statusCode);
            res.json({ status: STATUS_MESSAGE.SUCCESS, message, data });
        };

        /* 400 */
        res.clientError = ({ statusCode, data = null, error = null, message = null }) => {
            res.status(statusCode);
            res.json({ status: STATUS_MESSAGE.CLIENT_ERROR, data, message, error });
        };

        /* 500 */
        res.serverError = ({ statusCode, data = null, error = null, message = null }) => {
            res.status(statusCode);
            res.json({ status: STATUS_MESSAGE.SERVER_ERROR, data, message, error });
        };

        /* 200 */
        res.ok = (params = {}) => {
            res.success({ ...params, statusCode: STATUS_CODE.HTTP_OK });
        };

        /* 201 */
        res.created = (params = {}) => {
            res.success({ ...params, statusCode: STATUS_CODE.HTTP_CREATED });
        };

        /* 400 */
        res.badRequest = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODE.HTTP_BAD_REQUEST });
        };

        /* 401 */
        res.unAuthorized = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODE.HTTP_UNAUTHORIZED });
        };

        /* 403 */
        res.forbidden = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODE.HTTP_FORBIDDEN });
        };

        /* 404 */
        res.notFound = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODE.HTTP_NOT_FOUND });
        };

        /* 405 */
        res.notAcceptable = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODE.HTTP_METHOD_NOT_ALLOWED });
        };

        /* 409 */
        res.conflict = (params = {}) => {
            res.clientError({ ...params, statusCode: STATUS_CODE.HTTP_CONFLICT });
        };

        /* 500 */
        res.internalServerError = (params = {}) => {
            res.serverError({ ...params, statusCode: STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR });
        };

        /* 501 */
        res.badGateway = (params = {}) => {
            res.serverError({ ...params, statusCode: STATUS_CODE.HTTP_BAD_GATEWAY });
        };

        /* 502 */
        res.badGateway = (params = {}) => {
            res.serverError({ ...params, statusCode: STATUS_CODE.HTTP_NOT_IMPLEMENTED });
        };

        /* 503 */
        res.serviceUnavailable = (params = {}) => {
            res.serverError({ ...params, statusCode: STATUS_CODE.HTTP_SERVICE_UNAVAILABLE, });
        };

        /* 504 */
        res.gatewayTimeout = (params = {}) => {
            res.serverError({ ...params, statusCode: STATUS_CODE.HTTP_GATEWAY_TIMEOUT, });
        };

        await next();
    }

};
