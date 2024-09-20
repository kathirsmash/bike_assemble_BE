const { express } = require('./../utils/package');
const CONSTANT = require('./../utils/const');
const BikeController = require('./../controllers/bike');
const verifyToken = require('./../middlewares/authentication');
const verifyRole = require('./../middlewares/authorization');
const bikeValidator = require('./../validators/bike');

const bikeRoutes = express.Router();

bikeRoutes.get('/list', verifyToken, verifyRole([CONSTANT.USER_TYPE.EMPLOYEE]), BikeController.getBikes);
bikeRoutes.post('/assemble', verifyToken, verifyRole([CONSTANT.USER_TYPE.EMPLOYEE]), bikeValidator.saveProductionLog, BikeController.saveProductionLog);

module.exports = bikeRoutes;