const { express } = require('./../utils/package');
const authController = require('./../controllers/auth');
const authValidator = require('./../validators/auth');

const authRoutes = express.Router();

authRoutes.post('/login', authValidator.login, authController.login);

module.exports = authRoutes;