const express = require('express');
const router = express.Router();
const featuredController = require('../controllers/featureController');


router.post('/create', featuredController.createFeatured);
router.get('/getById', featuredController.getFeaturedById);
router.get('/getAll', featuredController.getAllFeatured);
router.put('/updatefeature', featuredController.updateFeatured);
router.delete('/deletefeature', featuredController.deleteFeatured);

module.exports = router;
