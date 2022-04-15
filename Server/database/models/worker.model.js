const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");
mongoose.set("useUnifiedTopology", true);

const workerSchema = schema({
  username: { type: String, required: true, unique: true },
  local: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "basic" },
  },
  avatar: { type: String, default: null },
  number: { type: String, required: true, unique: true },
  state: { type: String, default: "unavailable" },
  lastHangUp: { type: Date, default: null },
});

workerSchema.statics.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (e) {
    throw e;
  }
};

workerSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password);
};

const Worker = mongoose.model("worker", workerSchema);

module.exports = Worker;
