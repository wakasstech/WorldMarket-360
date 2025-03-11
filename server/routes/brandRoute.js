

const express = require("express");

const brandController = require("../controllers/brandController");

const router = express.Router();

const {upload} =require('../MiddleWares/multer.middleware');

const auth =require('../MiddleWares/auth');

const excelUpload = require('../MiddleWares/excelUpload.js')

router.post("/createBrand", upload.single('brand_image'),brandController.createBrand);

 router.get("/BrandById" , brandController.getBrandById)

 router.get("/BrandByName" , brandController.searchBrandsByName)

 router.put("/updateBrand" ,upload.single('brand_image'), brandController.updateBrand)

 router.get("/brandAll" , brandController.getAllBrands)

 router.get("/brandAll1" , brandController.getAllBrands1)

 router.delete("/deleteBrand" , brandController.deleteBrand)
 router.put("/BrandImageDelete" , brandController.deleteBrandImage)

router.get('/brands-by-country', brandController.getBrandsByCountry);
router.put("/updateBrandImage" ,upload.single('brand_image'), brandController.updateBrandImage)
router.get('/getBrandsByCategory', brandController.getBrandsByCategory);

router.get('/getBrandsCategories', brandController.getBrandsByMultipleCategories);

router.post('/getCategoriesWithBrandsByCountries', brandController.getCategoriesWithBrandsByCountries);

router.post('/getProductsByBrandsInCountries', brandController.getProductsByBrandsInCountries);

router.post("/import-bulk-brands", excelUpload.single("file"),brandController.uploadBrandSheet);

router.post("/SearchBrand" , brandController.searchBrands)

module.exports = router;





