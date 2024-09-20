const { mongoose } = require('./../utils/package');
const commonService = require('./../services/common');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String },
    type: {
      type: String,
      enum: ['admin', 'employee']
    },
    password: { type: String }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await commonService.encryptPassword(this.password);
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update && update.password) {
    try {
      update.password = await commonService.encryptPassword(update.password);
      update.password = await bcrypt.hash(update.password, salt);
      this.setUpdate(update);
      next();
    } catch (err) {
      return next(err);
    }
  } else {
    next();
  }
});

module.exports = userSchema;
