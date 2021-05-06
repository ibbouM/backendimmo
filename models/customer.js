const mongoose = require("mongoose");
const argon2 = require("argon2");

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  adresse: {
    type: Object,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  numberphone: {
    type: String,
    required: true,
  },
});

customerSchema.pre("save", async function () {
  try {
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
  } catch (err) {
    console.log(err);
  }
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
