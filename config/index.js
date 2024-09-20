const { dotenv } = require('./../utils/package');

dotenv.config();

module.exports = Object.freeze({
    appName: process.env.APP_NAME,
    appEnv: process.env.APP_ENV,
    appPort: parseInt(process.env.APP_PORT),
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    bcryptSaltRound: parseInt(process.env.BCRYPT_SALT_ROUND),
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpireTime: process.env.JWT_EXPIRE_TIME
});
