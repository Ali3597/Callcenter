const mongoose = require("mongoose");
const schema = mongoose.Schema;

const callSchema = schema({
  customer: { type: schema.Types.ObjectId, ref: "customer" },
  number: { type: String, required: true },
  date: { type: Date, default: Date.now },
  time: { type: Number, min: 0, required: true },
  state: { type: String, required: true },
  destination: { type: schema.Types.ObjectId, ref: "worker", required: true },
});

const Call = mongoose.model("call", callSchema);

module.exports = Call;
