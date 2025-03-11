
const express = require('express');
const router = express.Router();
const blogCategoryController = require('../controllers/blogCategoryController');
router.post('/createblogCategory', blogCategoryController.createBlogCategory);
router.get ('/getAll',blogCategoryController.getAllBlogCategories);
router.get('/getById', blogCategoryController.getBlogCategoryById);
router.put('/updateBlogCategory', blogCategoryController.updateBlogCategory);
router.delete('/deleteBlogcategory', blogCategoryController.deleteBlogCategory);
module.exports = router;
