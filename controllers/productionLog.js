const { moment } = require('./../utils/package');
const DB_MODEL = require('./../utils/dbModel');
const dbService = require('./../services/db');
const dbConnection = require('./../models');
const responseMessages = require('./../utils/responseMessages');

class ProductionController {

    getBikesAssembled = async (req, res) => {
        try {
            const { from, to } = req.query;
            const finalResp = [];
            const findLogs = await dbService.find(
                dbConnection,
                DB_MODEL.PRODUCTION_LOG.MODEL,
                {
                    startTime: { $gte: moment(from).startOf('day').format('YYYY-MM-DD HH:mm:ss') },
                    endTime: { $lte: moment(to).endOf('day').format('YYYY-MM-DD HH:mm:ss') }
                },
                {},
                [{
                    path: 'bikeId',
                    select: { _id: 1, name: 1 }
                }]
            );
            findLogs.forEach((logObj) => {
                let findLogInd = finalResp.findIndex(x => x.name === logObj.bikeId.name);
                if (findLogInd < 0) {
                    finalResp.push({ name: logObj.bikeId.name, production: 0 });
                    findLogInd = finalResp.length - 1;
                }
                finalResp[findLogInd].production = parseInt(finalResp[findLogInd].production) + parseInt(logObj.duration);
            });
            return res.ok({
                data: finalResp
            });
        } catch (error) {
            console.log('Error:', error);
            return res.internalServerError({
                error: error,
                message: responseMessages[4016]
            });
        }
    }

}

module.exports = new ProductionController();
