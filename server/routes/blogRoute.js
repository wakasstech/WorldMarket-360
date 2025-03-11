const express = require("express");

const blogController = require("../controllers/blogController");

const router = express.Router();

 //const {dynamicFields, attachFilesMiddleware, upload } = require('../MiddleWares/multer.middleware');

const auth = require('../MiddleWares/auth');

const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // Configure multer with your desired storage options

// Define routes with updated function names

router.post("/createNewBlog",upload.any(),blogController.createBlog);

router.get("/getAllBlog", blogController.getBlogs);

router.get('/getblog', blogController.getBlogById);

router.get('/getblogsbyTag', blogController.getblogsByTags);

router.put('/updateBlog',upload.any(), blogController.updateBlog);

router.get('/getblogByBrand', blogController.getBlogsByBrand);

router.get('/getblogByCategory', blogController.getBlogsByCategory);

router.get('/getBlogByCountry', blogController.getBlogsByCountry);

module.exports = router;
// qwretrtte

