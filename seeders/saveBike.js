const { mongoose } = require('./../utils/package');
const config = require('./../config');
const dbService = require('./../services/db');
const dbModels = require('./../utils/dbModel');
const dbConnection = require('./../models');
const bikeArray = require('./../data/bike.json');

mongoose.connect(
    `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`, {
    useUnifiedTopology: true,
    maxPoolSize: 5,
    wtimeoutMS: 2500
});

var createBikePromise = function (bikeObj) {
    return new Promise(async (resolve, reject) => {
        try {
            const findBike = await dbService.findOne(
                dbConnection,
                dbModels.BIKE.MODEL,
                { username: bikeObj.username }
            );
            let resp;
            if (findBike) {
                resp = await dbService.findByIdAndUpdate(
                    dbConnection,
                    dbModels.BIKE.MODEL,
                    findBike._id,
                    { timeToAssemble: bikeObj.timeToAssemble }
                );
            } else {
                resp = await dbService.create(
                    dbConnection,
                    dbModels.BIKE.MODEL,
                    bikeObj
                );
            }
            resolve(resp);
        } catch (error) {
            console.log(error)
            reject(error);
        }
    })
}


Promise.all(bikeArray.map(createBikePromise))
    .then(function (promiseResp) {
        console.log(`Bike created: ${JSON.stringify(promiseResp)}`);
    })
    .catch(function (err) {
        console.log(`Failed to create: ${JSON.stringify(err)}`);
    });