const express = require('express');
const adsController = require('../controllers/adsController.js');
const { upload } = require('../MiddleWares/multer.middleware');
const router = express.Router();

// Routes for ads
router.post('/createAds', upload.single('image'), adsController.createAd);
router.get('/getAllAds', adsController.getAllAds);
router.get('/getAdsById', adsController.getAdById);
router.put('/updateAds', upload.single('image'), adsController.updateAd);
router.delete('/deleteAdsById', adsController.deleteAd);
router.get('/search', adsController.searchAdsByTitle);

module.exports = router;
