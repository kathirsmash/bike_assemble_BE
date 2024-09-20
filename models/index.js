const { mongoose } = require('./../utils/package');
const DB_MODEL = require('./../utils/dbModel');

module.exports = {
    [DB_MODEL.BIKE.MODEL]: mongoose.model(DB_MODEL.BIKE.COLLECTION, require('./bike'), DB_MODEL.BIKE.COLLECTION),
    [DB_MODEL.PRODUCTION_LOG.MODEL]: mongoose.model(DB_MODEL.PRODUCTION_LOG.COLLECTION, require('./productionLog'), DB_MODEL.PRODUCTION_LOG.COLLECTION),
    [DB_MODEL.USER.MODEL]: mongoose.model(DB_MODEL.USER.COLLECTION, require('./user'), DB_MODEL.USER.COLLECTION)
};