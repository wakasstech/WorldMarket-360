
const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();
const {upload} =require('../MiddleWares/multer.middleware');
const excelUpload = require('../MiddleWares/excelUpload.js')
const auth =require('../MiddleWares/auth');
router.post("/createCategory", upload.single('category_image'),categoryController.createCategory);
router.get("/CategoryById" , categoryController.getCategoryById)
router.get("/SearchCategoryByName" , categoryController.searchCategoriesByName)
router.get("/getBrandByCategory", categoryController.SearchBrandByCategory)
router.put("/updateCategory",upload.single('category_image'), categoryController.updateCategory)
router.get("/CategoryAll", categoryController.getAllCategories)
router.get("/CategoryAllByCountry" , categoryController.getCategoriesByCountry)
router.delete("/deleteCategory" , categoryController.deleteCategory)
router.get("/SearchCategory" , categoryController.searchcategories)
router.post("/getmultplecategoriesbycountries" , categoryController.getCategoriesByCountries)
router.post("/import-bulk-categories", excelUpload.single("file"),categoryController.uploadExcelSheet);
module.exports = router;








