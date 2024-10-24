const mongoose = require('mongoose');

// Grade Schema
const gradeSchema = new mongoose.Schema({
    date: Date,
    grade: String,
    score: Number
});

// Address Schema
const addressSchema = new mongoose.Schema({
    building: String,
    coord: [Number],
    street: String,
    zipcode: String
});

// Main Data Schema
const dataSchema = new mongoose.Schema({
    name: String,
    borough: String,
    cuisine: String,
    restaurant_id: String,
    address: addressSchema,
    grades: [gradeSchema]
});

module.exports = mongoose.model('Restaurant', dataSchema);
