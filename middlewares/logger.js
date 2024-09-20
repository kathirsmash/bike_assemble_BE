const {
    moment,
    uuid
} = require('./../utils/package');

function genetrateUuid() {
    return uuid();
}

function printLog(req, logJson) {
    console.log(JSON.stringify(logJson));
}

function getLogJson(req) {
    return {
        ip: req.ip,
        requestId: req.requestId,
        headers: req.headers,
        protocol: req.protocol,
        url: req.originalUrl,
        method: req.method
    };
}

exports.requestLog = () => {
    return async (req, res, next) => {
        req.requestId = genetrateUuid();
        req.startTime = moment().format('DD-MM-YYYY HH:mm:ss');
        printLog(req, {
            ...getLogJson(req),
            ...{
                type: 'request',
                startTime: req.startTime
            }
        });
        next();
        res.on('finish', () => {
            req.endTime = moment().format('DD-MM-YYYY HH:mm:ss');
            printLog(req, {
                ...getLogJson(req),
                ...{
                    type: 'response',
                    endTime: req.endTime,
                    processedTime: moment(req.endTime, 'DD-MM-YYYY HH:mm:ss').diff(moment(req.startTime, 'DD-MM-YYYY HH:mm:ss')) + ' ms',
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage
                }
            });
        });
    };
}
