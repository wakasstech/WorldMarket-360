
const express = require("express");
const productController = require("../controllers/productController.js");
const {upload} =require('../MiddleWares/multer.middleware');
const router = express.Router();
const excelUpload = require('../MiddleWares/excelUpload.js')
router.post("/addProduct", upload.single('logo'),upload.array('variants'),productController.addProduct);
router.post("/addProductByUser", upload.single('logo'),productController.addProductByUser);
router.get("/getAllProducts" , productController.getAllProducts)
router.get("/getAllProductsImported" , productController.getAllProductsImported)
router.get("/getProductsById" , productController.getProductsById)
router.get('/getProductsByStatus' , productController.getProductsByStatus)
router.get('/getProductsByPosition' , productController.getProductsByPosition)
router.get('/getProductsByBrand' , productController.getProductsByBrand)
router.get("/getAllProductsWithCategory" , productController.getAllProductsGroupedByCategory)
router.get('/getProductsByBrandAndCategories' , productController.getProductsByBrandAndCategories)
router.get('/getPopularProducts' , productController.getPopularProducts)
//router.get('/searchProducts' , productController.searchProducts)
router.put('/editProduct' ,upload.single('logo'), productController.editProduct)
router.put('/updateProductImages', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'product_image', maxCount: 1 }]), productController.updateProductImages);
router.put('/updateStatuses' , productController.updateProductStatuses)
router.post('/uploadImageToCloudinary', upload.single('variant'), productController.uploadImageToCloudinary);
router.post('/deleteImageFromCloudinary', productController.deleteImageFromCloudinary);

router.put('/updatePDetails' , productController.updateProductDetails)
router.delete('/deleteProduct' , productController.deleteProduct)
router.delete('/deleteProducts' , productController.deleteProducts)
router.post("/import-excel", excelUpload.single("file"),productController.uploadExcelSheet);
router.get("/getproductsBycountry" , productController.getAllProductsByCountry)
router.get("/getProductsByCategory" , productController.getProductsByCategory)
router.post('/get-background-color', productController.getBackgroundColor);
router.get("/getcountriesByProduct" , productController.getAllCountriesByProduct)
router.get("/getproductsByRegion" , productController.getAllProductsByRegion)
router.get("/searchProducts",productController.searchProducts)
router.get("/search",productController.search)
module.exports = router;