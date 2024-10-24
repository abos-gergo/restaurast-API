require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/restaurant');

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(express.json());
app.use('/', routes);

app.listen(8000, () => {
    console.log(`Server Started at 8000`)
})
