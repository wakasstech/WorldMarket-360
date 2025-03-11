
const express = require("express");
const myController = require("../controllers/myController");
const router = express.Router();
const auth =require('../MiddleWares/auth');
const {upload} =require('../MiddleWares/multer.middleware');
router.post("/uploadlogoimg",  upload.single('logo_image'),myController.fordetectLogos);
router.post("/feedback",  upload.single('logo'),myController.addProductByUser);
router.post("/removeBackground",  upload.single('logo_image'),myController.removeBackground);
router.post("/detectlogo",  upload.single('logo_image'),myController.detectLogos);
module.exports = router;







