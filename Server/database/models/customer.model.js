const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Request = require("./request.model");

const customerSchema = schema({
  name: { type: String, default: "unknow" },
  number: { type: String, unique: true, required: true },
  email: { type: String, unique: true, default: "unknow" },
  avatar: { type: String, default: null },
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
