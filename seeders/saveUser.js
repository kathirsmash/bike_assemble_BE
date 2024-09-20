const { mongoose } = require('./../utils/package');
const config = require('./../config');
const dbService = require('./../services/db');
const dbModels = require('./../utils/dbModel');
const dbConnection = require('./../models');
const userArray = require('./../data/user.json');

mongoose.connect(
    `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`, {
    useUnifiedTopology: true,
    maxPoolSize: 5,
    wtimeoutMS: 2500
});

var createUserPromise = function (userObj) {
    return new Promise(async (resolve, reject) => {
        try {
            const findUser = await dbService.findOne(
                dbConnection,
                dbModels.USER.MODEL,
                { username: userObj.username }
            );
            let resp;
            if (findUser) {
                resp = await dbService.findByIdAndUpdate(
                    dbConnection,
                    dbModels.USER.MODEL,
                    findUser._id,
                    { password: userObj.password, type: userObj.type }
                );
            } else {
                resp = await dbService.create(
                    dbConnection,
                    dbModels.USER.MODEL,
                    userObj
                );
            }
            resolve(resp);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}


Promise.all(userArray.map(createUserPromise))
    .then(function (promiseResp) {
        console.log(`User created: ${JSON.stringify(promiseResp)}`);
    })
    .catch(function (err) {
        console.log(`Failed to create: ${JSON.stringify(err)}`);
    });