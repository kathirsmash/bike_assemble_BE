const { v4: UUID_V4 } = require('uuid');

module.exports = {
    bcrypt: require('bcrypt'),
    cors: require('cors'),
    dotenv: require('dotenv'),
    express: require('express'),
    joi: require('joi'),
    jwt: require('jsonwebtoken'),
    moment: require('moment'),
    mongoose: require('mongoose'),
    uuid: UUID_V4
};