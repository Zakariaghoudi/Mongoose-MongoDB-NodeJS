const mongoose = require("mongoose");
const validator = require("validator");
//import the timestamp plugin
const timeStamps = require("./plugins/timestamp");

// create a schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => validator.isLength(value, { min: 4, max: 20 }),
      message: "name must be between 4 and 20 characters",
    },
  },
  age: { type: Number, min: 12, max: 60 }, // age between 12 and 60 

  favoriteFoods: { type: [String], default: [] },
});

// Add the timestamp plugin to the schema : for createdAt and updatedAt fields
personSchema.plugin(timeStamps);

// export the model
module.exports = mongoose.model("Person", personSchema);
