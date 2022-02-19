const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const Car = require("../models/cars");

const cars = [
    { id: 1, car: "Toyota Corolla", model: "DX", year: 2000, type: "Sedan" },
    { id: 2, car: "Suzuki Vitara", model: "ALX", year: 1995, type: "SUV" },
    { id: 3, car: "Hyundai Atoz", model: "Hatchback", year: 1997, type: "Compact" },
];

// get all cars or filter cars
// router.get('/', (req, res) => {
//     if (!req.query) res.send(cars);
//     filters = req.query;
//     const filteredCars = cars.filter(car => {
//         let isValid = true;
//         for (key in filters) {
//             isValid = isValid && car[key] == filters[key];
//         }
//         return isValid;
//     });
//     console.log(filteredCars);
//     if (filteredCars == []) res.send("No Cars of this type!");
//     else res.send(filteredCars);
// });

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
    console.log(cars)
  } catch (err) {
    res.send({
      error: err,
    });
    console.log(err);
  }
});



// get specific car
router.get("/:carId", async (req, res) => {
    try {
      const result = await Car.find({ carId: req.params?.carId });
      res.status(200).send(result);
      // res.send("it's working") 
    } catch (err) {
      console.error(err);
      // res.status(404).send("Car could not be found!");
    }
  });


router.post("/", async (req, res) => {
    const newCar = new Car( {
        carId: req.body.carId,
        make: req.body.make,
        transmission: req.body.transmission,
        year: req.body.year,
        price: req.body.price,
        mileage: req.body.mileage,
        condition: req.body.condition,
        comment: req.body.comment
    });

    try {
        const postedCar = await newCar.save();
        res.send(postedCar);
        console.log(req.body)
      } catch (err) {
        console.log(err)
      }
})


// router.put('/:id', (req, res) => {
//     // lookup the car
//     const car = cars.find(c => c.id === parseInt(req.params.id));
//     if (!car) return res.status(404).send("Car could not be found!");

//     // validate car
//     const { error } = validateCars(req.body);
//     if (error) return res.status(400).send(error);

//     // update car
//     car.id = (req.body.id) ? req.body.id : car.id;
//     car.car = (req.body.car) ? req.body.car : car.car;
//     car.model = (req.body.model) ? req.body.model : car.model;
//     car.year = (req.body.year) ? req.body.year : car.year;
//     car.type = (req.body.type) ? req.body.type : car.type;
//     // return updated car
//     res.send(car);
// });


router.delete('/:id', async (req, res) => {
    try {
        const removedCar = await Car.deleteOne(
          {
            carId: req.params.carId,
          },
          {
            $set: {},
          }
        );
        res.json(removedCar);
      } catch (error) {}
});

module.exports = router;