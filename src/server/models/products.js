const mongoose = require('mongoose');

// create schema
const productSchema = new mongoose.Schema({
    id: Number,
    image: String,
    name: String,
    price: Number,
    rating: Number
});

// create model
const Product = mongoose.model('Product', productSchema);

// export model
module.exports = Product;
