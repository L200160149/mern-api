const express = require("express");

const router = express.Router();

const productsController = require("../controllers/products");

// READ
router.get("/products", productsController.getAllProducts);

// CREATE
router.post("/product", productsController.createProduct);

module.exports = router;
