const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  contact: {
    type: Number,
    require: true,
    min: 10,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
});

const Student = new mongoose.model("Logincoll", schema);

module.exports = Student;
