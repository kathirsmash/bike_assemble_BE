const { mongoose } = require('./../utils/package');
const DB_MODELS = require('./../utils/dbModel');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productionSchema = new Schema(
    {
        employeeId: {
            type: ObjectId,
            ref: DB_MODELS.USER.COLLECTION
        },
        bikeId: {
            type: ObjectId,
            ref: DB_MODELS.BIKE.COLLECTION
        },
        startTime: { type: Date },
        endTime: { type: Date },
        duration: { type: Number }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = productionSchema;
