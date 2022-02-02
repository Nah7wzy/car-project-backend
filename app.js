const express = require('express');
const app = express();

const cars = require('./routes/cars');

app.use(express.json());
app.use('/api/cars', cars);

// an envt variable called PORT, for production
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));