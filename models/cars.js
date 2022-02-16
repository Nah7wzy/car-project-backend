const mongoose = require("mongoose");

const carsSchema = mongoose.Schema({
    carID: { type: Number, required: true },
    make: { type: String, required: true},
    year: { type: Number, required: true},
    price: { type: Number, required: true },
    transmission: { type: String },
    mileage: { type: Number },
    condition: {type: String },
    comment: {type: String }
});

const Car = mongoose.model("Car", carsSchema);
module.exports = Car;