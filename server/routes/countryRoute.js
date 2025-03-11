const express = require('express');
const countryController = require('../controllers/countryController'); 
const router = express.Router();
const excelUpload = require('../MiddleWares/excelUpload.js')
//router.post('/create-country', countryController.createCountry);
router.get('/getAll-country', countryController.getAllCountries);
router.get('/getCountryById', countryController.getCountryById);
router.put('/updateCountryById', countryController.updateCountry);
router.get('/get-contryandcontinents', countryController.getCountriesAndContinents);
router.post('/bulk-country', countryController.CreateBulkCountry);
router.get('/all-country', countryController.getAllCountries);
//router.get('/country-by-continents', countryController.GetCountriesByContinent);
router.get('/getCountryByContinent', countryController.getCountriesByContinent);
router.put("/update-countries-color-and-status", excelUpload.single("file"),countryController.uploadExcelSheet);

module.exports = router;