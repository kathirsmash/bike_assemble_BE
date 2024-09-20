const { mongoose } = require('./../utils/package');
const config = require('./');
const responseMessages = require('./../utils/responseMessages');

mongoose.connect(
    `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`, {
    maxPoolSize: 5,
    wtimeoutMS: 2500
});

const db = mongoose.connection;

db.on('error', err => console.log(responseMessages[4003], err));
db.once('open', () => console.log(responseMessages[4004]));
