const { moment } = require('./../utils/package');
const DB_MODEL = require('./../utils/dbModel');
const dbService = require('./../services/db');
const dbConnection = require('./../models');
const responseMessages = require('./../utils/responseMessages');

class BikeController {

    getBikes = async (req, res) => {
        try {
            const findbikes = await dbService.find(
                dbConnection,
                DB_MODEL.BIKE.MODEL,
                {},
                {},
                [],
                {name: 1}
            );
            return res.ok({
                data: findbikes
            });
        } catch (error) {
            console.log('Error:', error);
            return res.internalServerError({
                error: error,
                message: responseMessages[4015]
            });
        }
    }

    saveProductionLog = async (req, res) => {
        try {
            const payload = req.body;
            const findbike = await dbService.findById(
                dbConnection,
                DB_MODEL.BIKE.MODEL,
                payload.bikeId
            );
            if (!findbike) {
                return res.notFound({ message: responseMessages[4012] });
            }
            await dbService.create(
                dbConnection,
                DB_MODEL.PRODUCTION_LOG.MODEL,
                {
                    bikeId: findbike._id,
                    employeeId: req.loginUser._id,
                    startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                    endTime: moment().add(findbike.timeToAssemble, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                    duration: findbike.timeToAssemble
                }
            );
            return res.ok({ message: responseMessages[4014] });
        } catch (error) {
            console.log('Error:', error);
            return res.internalServerError({
                error: error,
                message: responseMessages[4013]
            });
        }
    }

}

module.exports = new BikeController();
