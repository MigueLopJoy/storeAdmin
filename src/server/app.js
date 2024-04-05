// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/products');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/storeAdmin';

const productsToInsert = [
    { "image": "assets/images/products/image1.jpg", "name": "Black Hoodie", "price": 24, "rating": 5 },
    { "name": "Branded Shoes", "image": "assets/images/products/image2.jpg", "price": 13.5, "rating": 4 },
    { "name": "Jeans Jacket", "image": "assets/images/products/image6.jpg", "price": 115.0, "rating": 4 },
    { "name": "Black T-Shirt (Womens)", "image": "assets/images/products/image7.jpg", "price": 25.0, "rating": 3 },
    { "name": "Beige Trench Coat", "image": "assets/images/products/image8.jpg", "price": 52.0, "rating": 1 },
    { "name": "Stylish Shoes", "image": "assets/images/products/image9.jpg", "price": 32.0, "rating": 2 },
    { "name": "Stylish Shoes - B", "image": "assets/images/products/image10.jpg", "price": 55.0, "rating": 5 },
    { "name": "Beanie Black", "image": "assets/images/products/image11.jpg", "price": 15.0, "rating": 1 },
    { "name": "Beanie Orange", "image": "assets/images/products/image12.jpg", "price": 12.5, "rating": 2 },
    { "name": "Beanie Red", "image": "assets/images/products/image13.jpg", "price": 14.5, "rating": 4 },
    { "name": "Cyan Long Sleeve Shirt", "image": "assets/images/products/image15.jpg", "price": 15.5, "rating": 5 },
    { "name": "Yellow Raincoat", "image": "assets/images/products/image16.jpg", "price": 12.5, "rating": 3 }
];

const corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 204,
    methods: "GET, POST, PUT, DELETE",
};

// Middlewares
app.use(bodyParser.json());

app.use(cors(corsOptions))

// Routes
app.use('/products', productRoutes);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        const productsCount = await Product.countDocuments();
        if (productsCount === 0) {
            console.log('No products found. Initializing...');
            // Insert all products into the database
            await Product.insertMany(productsToInsert);
            console.log('Products inserted successfully.');
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
