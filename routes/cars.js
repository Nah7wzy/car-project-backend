const express = require('express');
const router = express.Router();

const cars = [
    { id: 1, car: "Toyota Corolla", model: "DX", year: 2000, type: "Sedan" },
    { id: 2, car: "Suzuki Vitara", model: "ALX", year: 1995, type: "SUV" },
    { id: 3, car: "Hyundai Atoz", model: "Hatchback", year: 1997, type: "Compact" },
];

// get all cars or filter cars
router.get('/', (req, res) => {
    if (!req.query) res.send(cars);
    filters = req.query;
    const filteredCars = cars.filter(car => {
        let isValid = true;
        for (key in filters) {
            isValid = isValid && car[key] == filters[key];
        }
        return isValid;
    });
    console.log(filteredCars);
    if (filteredCars == []) res.send("No Cars of this type!");
    else res.send(filteredCars);
});

// get specific car
router.get('/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id))
    if (car) res.send(car);
    else res.status(404).send("Car could not be found!");
});

router.post('/', (req, res) => {
    const { error } = validateCars(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const car = {
        id: cars.length + 1,
        car: req.body.car,
        model: req.body.model,
        year: req.body.year,
        type: req.body.type,
    };
    cars.push(car);
    res.send(car);
})

router.put('/:id', (req, res) => {
    // lookup the car
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send("Car could not be found!");

    // validate car
    const { error } = validateCars(req.body);
    if (error) return res.status(400).send(error);

    // update car
    car.id = (req.body.id) ? req.body.id : car.id;
    car.car = (req.body.car) ? req.body.car : car.car;
    car.model = (req.body.model) ? req.body.model : car.model;
    car.year = (req.body.year) ? req.body.year : car.year;
    car.type = (req.body.type) ? req.body.type : car.type;
    // return updated car
    res.send(car);
});

router.delete('/:id', (req, res) => {
    // lookup the car
    const car = cars.find(c => c.id === parseInt(req.params.id))
    if (!car) return res.status(404).send("Car could not be found!");

    // delete the car
    const index = cars.indexOf(car);
    cars.splice(index, 1);

    res.send(car);
});

module.exports = router;