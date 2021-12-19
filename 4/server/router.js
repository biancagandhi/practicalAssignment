require("./db").connect();
const express = require("express");
const router = express.Router();
const Product = require("./model");

router.get("/products", (req, res) => {
  Product.find({}, (err, data) => {
    res.send(data);
    console.log(data);
  });
});

router.post("/admin/product", (req, res) => {
  Product.insertMany(req.body, (err, data) => {
    res.send(data);
  });
});

router.get("/admin/product/:id", (req, res) => {
  Product.findOne({ _id: req.params.id }, (err, data) => {
    res.send(data);
  });
});

router.put("/admin/product/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    console.log(data);
    res.send(data);
  });
});

router.delete("/admin/product/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, data) => {
    res.send(data);
  });
});
module.exports = router;
