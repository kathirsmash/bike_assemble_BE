const { express } = require('./../utils/package');
const CONSTANT = require('./../utils/const');
const ProductionLogController = require('./../controllers/productionLog');
const verifyToken = require('./../middlewares/authentication');
const verifyRole = require('./../middlewares/authorization');

const productionLogRoutes = express.Router();

productionLogRoutes.get('/bikes-assembled', verifyToken, verifyRole([CONSTANT.USER_TYPE.ADMIN]), ProductionLogController.getBikesAssembled);

module.exports = productionLogRoutes;