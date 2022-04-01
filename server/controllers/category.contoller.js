const Category = require("../models/Category.model");

module.exports.categoryController = {
  createCategory: async (req, res) => {
    try {
      const createCategory = await Category.create({
        name: req.body.name,
        img: req.body.img,
      });
      res.json(createCategory);
    } catch (error) {
      console.log(error);
    }
  },
  editCategory: async (req, res) => {
    try {
      const editCategory = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        img: req.body.img,
      });
      res.json(editCategory);
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const deleteCategory = await Category.findByIdAndDelete(req, params.id);
      res.json(deleteCategory);
    } catch (error) {
      console.log(error);
    }
  },
  getCategory: async (req, res) => {
    try {
      const getCategory = await Category.find();
      res.json(getCategory);
    } catch (error) {
      console.log(error);
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const getCategoryById = await Category.findById(req.params.id);
      res.json(getCategoryById);
    } catch (error) {
      console.log(error);
    }
  },
};
