const db = require('../models/index.js');
const { uploadOnCloudinary, deleteOnCloudinary } = require('../utils/cloudinary.js');
const fs = require('fs');
const readXlsxFile = require("read-excel-file/node");
const countryModel= db.countryModel;
// Create a new country
exports.createCountry = async (req, res) => {
  try {
    const { country_name, country_code, country_continent } = req.body;
    const newCountry = await countryModel.create({ country_name, country_code, country_continent });
    return res.status(201).json(newCountry);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Get all countries
exports.getAllCountries = async (req, res) => {
  try {
    const countries = await countryModel.findAll();
    const groupedCountries = countries.reduce((acc, country) => {
      const { country_continent } = country;
      if (!acc[country_continent]) {
        acc[country_continent] = [];
      }
      acc[country_continent].push(country);
      return acc;
    }, {});
    return res.status(200).json(groupedCountries);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Get a single country by ID
exports.getCountryById = async (req, res) => {
  try {
    const { id } = req.query;
    const country = await countryModel.findOne({ where: { id } });
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }
    return res.status(200).json(country);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.getCountriesByContinent = async (req, res) => {
  try {
    const { continent } = req.query;
    // Check if continent is provided
    if (!continent) {
      return res.status(400).json({ error: 'Continent is required' });
    }
    // Find countries by continent using findAll() instead of find()
    const countries = await countryModel.findAll({
      where: { country_continent: continent },
    });
    // Check if any countries were found
    if (!countries || countries.length === 0) {
      return res.status(404).json({ error: 'No countries found for this continent' });
    }
    return res.status(200).json({Continent:continent, countries,"Number Of Country":countries.length});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Update a country by ID
exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.query;
    const { country_name, country_code, country_continent } = req.body;
    const country = await countryModel.findOne({ where: { id } });

    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }
    country.country_name = country_name || country.country_name;
    country.country_code = country_code || country.country_code;
    country.country_continent = country_continent || country.country_continent;
    await country.save();
    return res.status(200).json(country);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a country by ID
exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await countryModel.findOne({ where: { id } });
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }
    await country.destroy();
    return res.status(200).json({ message: 'Country deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const axios = require('axios');
exports.getCountriesAndContinents = async function getCountriesAndContinents(req, res) {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data.map(country => ({
      name: country.name.common,
      continent: country.region,
      code: country.cca2, 
    }));
    // Filter out any countries without a continent and sort alphabetically by country name
    const filteredCountries = countries.filter(c => c.continent).sort((a, b) => a.name.localeCompare(b.name));
    console.log(filteredCountries.length);

    // Send the filtered countries as the response
    res.json(filteredCountries);
  } catch (error) {
    console.error('Error fetching countries and continents:', error);
    res.status(500).json({ message: 'Failed to fetch countries and continents' });
  }
};
// exports.CreateBulkCountry = async (req, res)=> {
//   try {
//     const response = await axios.get('https://restcountries.com/v3.1/all');
//     const countries = response.data.map(country => ({
//       country_name: country.name.common,
//       country_continent: country.region,
//       country_code: country.cca2, 
//     }));
//     const filteredCountries = countries.filter(c => c.country_continent).sort((a, b) => a.country_name.localeCompare(b.country_name));
//     const savedCountries = [];
//     for (const country of filteredCountries) {
//       try {
        
//         const existingCountry = await countryModel.findOne({
//           where: {
//             country_name: country.country_name,
//             country_code: country.country_code,
//             country_continent: country.country_continent
//           }
//         });

//         // If the country doesn't exist, create it
//         if (!existingCountry) {
//           const newCountry = await countryModel.create(country);
//           savedCountries.push(newCountry); // Add the newly saved country to the response array
//         }
//       } catch (error) {
//         console.error(`Error saving country ${country.country_name}:`, error.message);
//         return res.status(500).json({ error: `Failed to save country ${country.country_name}` });
//       }
//     }

//     // Step 4: Send the saved countries as the response
//     if (savedCountries.length > 0) {
//       return res.status(201).json({ message: 'Countries saved successfully', savedCountries });
//     } else {
//       return res.status(200).json({ message: 'No new countries were added', savedCountries });
//     }
//   } catch (error) {
//     console.error('Error fetching or saving countries and continents:', error);
//     return res.status(500).json({ message: 'Failed to fetch or save countries and continents' });
//   }
// };
exports.CreateBulkCountry = async (req, res) => {
  try {
    // Fetch countries data from the REST Countries API
    const response = await axios.get('https://restcountries.com/v3.1/all');
    // Map the response to include country_name, country_continent, country_code, and country_flag
    const countries = response.data.map(country => ({
      country_name: country.name.common,
      country_continent: country.region,
      country_code: country.cca2, 
      country_flag: country.flags && country.flags.png 
    }));
    const filteredCountries = countries.filter(c => c.country_continent).sort((a, b) => a.country_name.localeCompare(b.country_name));
    const savedCountries = [];
    for (const country of filteredCountries) {
      try {
        // Check if the country already exists in the database
        const existingCountry = await countryModel.findOne({
          where: {
            country_name: country.country_name,
            country_code: country.country_code,
            country_continent: country.country_continent
          }
        });
        // If the country doesn't exist, create it
        if (!existingCountry) {
          const newCountry = await countryModel.create(country);
          savedCountries.push(newCountry); // Add the newly saved country to the response array
        }
      } catch (error) {
        console.error(`Error saving country ${country.country_name}:`, error.message);
        return res.status(500).json({ error: `Failed to save country ${country.country_name}` });
      }
    }

    // Send the saved countries as the response
    if (savedCountries.length > 0) {
      return res.status(201).json({ message: 'Countries saved successfully', savedCountries });
    } else {
      return res.status(200).json({ message: 'No new countries were added', savedCountries });
    }
  } catch (error) {
    console.error('Error fetching or saving countries and continents:', error);
    return res.status(500).json({ message: 'Failed to fetch or save countries and continents' });
  }
};

exports.GetAllCountries = async (req, res) => {
  try {
    // Fetch all countries from the database
    const countries = await countryModel.findAll({
      order: [['country_name', 'ASC']] // Sort by country name in ascending order
    });
    // Check if countries exist
    if (countries.length > 0) {
      return res.status(200).json({ message: 'Countries retrieved successfully', countries });
    } else {
      return res.status(404).json({ message: 'No countries found' });
    }
  } catch (error) {
    console.error('Error fetching countries:', error);
    return res.status(500).json({ message: 'Failed to fetch countries' });
  }
};
exports.uploadExcelSheet = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Please upload an Excel file!");
    }
    const filePath = req.file.path;
    // Read the Excel file
    const rows = await readXlsxFile(filePath);
    const countriesToUpdate = rows.slice(1).map(row => ({
      country_name: row[0],
      unMember: row[1], 
      bgColor: row[2],        
           
    }));
    // Update the countries in the database
    for (const country of countriesToUpdate) {
      const existingCountry = await countryModel.findOne({ where: { country_name: country.country_name } });
      if (existingCountry) {
        // Update the color and unMember value for the existing country
        await existingCountry.update({
          bgColor : country.bgColor,
          unMember: country.unMember
        });
      } else {
        console.log(`Country ${country.country_name} not found in the database.`);
      }
    }

    // Delete the file after processing
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File ${filePath} deleted after processing.`);
    }

    res.status(200).send({
      message: "File uploaded and countries updated successfully."
    });
  } catch (error) {
    console.log(error.message);
    if (req.file && req.file.path) {
      try {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
          console.log(`File ${req.file.path} deleted due to error.`);
        }
      } catch (unlinkError) {
        console.error(`Error removing file: ${unlinkError.message}`);
      }
    }
    res.status(500).send({
      message: "Could not process the file: " + req.file.originalname,
      error: error.message
    });
  }
};
