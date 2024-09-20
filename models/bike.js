const { mongoose } = require('./../utils/package');
const Schema = mongoose.Schema;

const bikeSchema = new Schema(
    {
        name: { type: String },
        timeToAssemble: { type: Number }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = bikeSchema;
