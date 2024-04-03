const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// GET all products
router.get('/', async (req, res) => {
    console.log("REQUEST RECEIVED")
    try {
        const products = await Product.find();
        console.log(products)
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one product
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
});

// POST create a new product
router.post('/', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update a product
router.put('/:id', getProduct, async (req, res) => {
    if (req.body.id != null) {
        res.product.id = req.body.id;
    }
    if (req.body.image != null) {
        res.product.image = req.body.image;
    }
    if (req.body.name != null) {
        res.product.name = req.body.name;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    if (req.body.rating != null) {
        res.product.rating = req.body.rating;
    }
    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a product
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findOne({ id: req.params.id });
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.product = product;
    next();
}

module.exports = router;
