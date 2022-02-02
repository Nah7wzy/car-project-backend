const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const cars = [
    { id: 1, car: "Toyota Corolla" },
    { id: 2, car: "Suzuki Vitara" },
    { id: 3, car: "Hyundai Atoz" },
];

app.get('/api/cars', (req, res) => {
    res.send(cars);
});

app.get('/api/cars/:id', (req, res) => {
    const car = cars.find(c => c.id === parseInt(req.params.id))
    if (car) res.send(car);
    else res.status(404).send("Cant find car");
});

app.post('/api/cars', (req, res) => {
    const { error } = validateCars(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const car = {
        id: cars.length + 1,
        name: req.body.car,
    };
    cars.push(car);
    res.send(car);
})

app.put('/api/cars/:id', (req, res) => {
    // lookup the car
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).send("Cant find car");

    // validate the car
    const { error } = validateCars(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // update car
    car.car = req.body.car;

    // return updated car
    res.send(car);
});

app.delete('/api/cars/:id', (req, res) => {
    // lookup the car
    const car = cars.find(c => c.id === parseInt(req.params.id))
    if (!car) return res.status(404).send("Cant find car");

    // delete the car
    const index = cars.indexOf(car);
    cars.splice(index, 1);

    res.send(car);
})

function validateCars(car) {
    const schema = {
        car: Joi.string().min(3).required()
    };

    return Joi.validate(car, schema);
}

// an envt variable called PORT, for production
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));