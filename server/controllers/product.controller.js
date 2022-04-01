const Product = require("../models/Product.model");

module.exports.productController = {
  createProduct: async (req, res) => {
    try {
      const {
        name,
        price,
        description,
        image,
        left,
        amount,
        rating,
        category,
        categoryId,
      } = req.body;
      const createProduct = await Product.create({
        name,
        price,
        description,
        image,
        left,
        amount,
        rating,
        category,
        categoryId,
      });
      res.json(createProduct);
    } catch (error) {
      console.log(error);
    }
  },

  editProduct: async (req, res) => {
    try {
      console.log(2);
      const {
        name,
        price,
        description,
        image,
        left,
        amount,
        rating,
        category,
        categoryId,
      } = req.body;
      console.log(req.params.id);
      await Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        description,
        image,
        left,
        amount,
        rating,
        category,
        categoryId,
      });
      console.log(1);
      res.json(1);
    } catch (error) {
      console.log(error.toString());
      res.json({ error });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json("Deleted");
    } catch (error) {
      console.log(error);
    }
  },
  getProduct: async (req, res) => {
    try {
      const getProduct = await Product.find();
      res.json(getProduct);
    } catch (error) {
      console.log(error);
    }
  },
  getProductById: async (req, res) => {
    try {
      const getProductById = await Product.findById(req.params.id);
      res.json(getProductById);
    } catch (error) {
      console.log(error);
    }
  },
};
