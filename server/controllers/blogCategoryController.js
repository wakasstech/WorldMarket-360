// controllers/blogCategory.controller.js
const db = require("../models/index.js");
const blogCategory = db.blogCategory;
const createBlogCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await blogCategory.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation error
      res.status(400).json({ error: 'Category name already exists' });
    } else {
      // Handle other errors
      res.status(500).json({ error: error.message });
    }
  }
};
const getAllBlogCategories = async (req, res) => {
  try {
    const blogCategories = await blogCategory.findAll();
    res.status(200).json(blogCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBlogCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogCategory = await blogCategory.findByPk(id);
    if (blogCategory) {
      res.status(200).json(blogCategory);
    } else {
      res.status(404).json({ message: 'BlogCategory not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateBlogCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const [updated] = await blogCategory.update({ name, description }, {
      where: { id }
    });
    if (updated) {
      const updatedBlogCategory = await BlogCategory.findByPk(id);
      res.status(200).json(updatedBlogCategory);
    } else {
      res.status(404).json({ message: 'BlogCategory not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBlogCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BlogCategory.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'BlogCategory not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBlogCategory,
  getAllBlogCategories,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory
};
