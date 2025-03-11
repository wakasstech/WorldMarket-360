const db = require('../models/index.js');
const featureModel= db.featureModel;
// Create a new Featured item
// exports.createFeatured = async (req, res) => {
//   try {
//     const { product, brand, category, country,feature_title } = req.body;
  
//     const newFeatured = await featureModel.create(
//      req.body
//     );
//     return res.status(201).json({ message: "Featured item created successfully", data: newFeatured });
//   } catch (error) {
//     return res.status(500).json({ message: "Error creating featured item", error });
//   }
// };
exports.createFeatured = async (req, res) => {
  try {
    const {  country } = req.body;
    const countryName = country 
    if (!countryName) {
      return res.status(400).json({ message: "Country information is missing" });
    }
   const existingFeature = await featureModel.findOne({
      where: {
        country: 
    countryName
      }
    });
    if (existingFeature) {
      return res.status(400).json({ message: "This country already has a featured item" });
    }

    
    const newFeatured = await featureModel.create({...req.body,status: 'edit'});
    return res.status(201).json({ message: "Featured item created successfully", data: newFeatured });
  } catch (error) {
    return res.status(500).json({ message: "Error creating featured item", error });
  }
};
// Get a Featured item by ID
exports.getFeaturedById = async (req, res) => {
  try {
    const { id } = req.query;
    const featuredItem = await featureModel.findByPk(id);
    if (!featuredItem) {
      return res.status(404).json({ message: "Featured item not found" });
    }
    return res.status(200).json(featuredItem);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving featured item", error });
  }
};
// Get all Featured items


// exports.getAllFeatured = async (req, res) => {
//   try {
//     // Fetch all featured items from the database
//     const featuredItems = await featureModel.findAll();

//     // Define the structure of the response
//     const response = {
//       initialCountries: [],
//       initialCategories: {},
//       initialBrands: {},
//       initialProducts: {},
//       initialStatus: {} // Add initialStatus for each country as a single value
//     };

//     // Loop through each item to populate the response structure
//     featuredItems.forEach((item) => {
//       const { country, categories, brands, products, status } = item;

//       // Add the country to the initialCountries array if it's not already present
//       if (!response.initialCountries.includes(country)) {
//         response.initialCountries.push(country);
//       }
      
//       // Initialize country-based arrays if they don't exist
//       response.initialCategories[country] = response.initialCategories[country] || [];
//       response.initialBrands[country] = response.initialBrands[country] || [];
//       response.initialProducts[country] = response.initialProducts[country] || [];
//       // Set status for each country
//       response.initialStatus[country] = status;
//       // Add unique category, brand, and product IDs for each country
//       response.initialCategories[country] = [...new Set([...response.initialCategories[country], ...categories])];
//       response.initialBrands[country] = [...new Set([...response.initialBrands[country], ...brands])];
//       response.initialProducts[country] = [...new Set([...response.initialProducts[country], ...products])];
//     });
//     // Send the structured response
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json({ message: "Error retrieving featured items", error });
//   }
// };
exports.getAllFeatured = async (req, res) => {
  try {
    const featuredItems = await featureModel.findAll();
    // Define the structure of the response
    const response = {
      initialCountries: [],
      initialCategories: {},
      initialBrands: {},
      initialProducts: {},
      initialStatus: {}, // Add initialStatus for each country as a single value
      completedFeatureCount: 0 // Add total count for completed features
    };
    featuredItems.forEach((item) => {
      const { country, categories, brands, products, status } = item;
      if (!response.initialCountries.includes(country)) {
        response.initialCountries.push(country);
      }
      // Initialize country-based arrays if they don't exist
      response.initialCategories[country] = response.initialCategories[country] || [];
      response.initialBrands[country] = response.initialBrands[country] || [];
      response.initialProducts[country] = response.initialProducts[country] || [];
      // Set status for each country
      response.initialStatus[country] = status;
      // Add unique category, brand, and product IDs for each country
      response.initialCategories[country] = [...new Set([...response.initialCategories[country], ...categories])];
      response.initialBrands[country] = [...new Set([...response.initialBrands[country], ...brands])];
      response.initialProducts[country] = [...new Set([...response.initialProducts[country], ...products])];
     
      if (status === "complete") {
        response.completedFeatureCount += 1;
      }
    });
    // Send the structured response
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving featured items", error });
  }
};
// Update a Featured item by ID
// exports.updateFeatured = async (req, res) => {
//   try {
//     const { country } = req.query;
//     console.log(country)
//     const featuredItem = await featureModel.findOne({ country });

//     console.log(featuredItem,"feature")
//     if (!featuredItem) {
//       return res.status(404).json({ message: "Featured item not found" });
//     }
//     await featuredItem.update({...req.body});
//     console.log(country, "updated")
//     return res.status(200).json({ message: "Featured item updated successfully", data: featuredItem });
//   } catch (error) {
//     return res.status(500).json({ message: "Error updating featured item", error });
//   }
// };
exports.updateFeatured = async (req, res) => {
  try {
    const { country } = req.query;
    console.log(country);

    const featuredItem = await featureModel.findOne({ where: { country } });

    console.log(featuredItem, "feature");
    if (!featuredItem) {
      return res.status(404).json({ message: "Featured item not found" });
    }

    await featuredItem.update({ ...req.body, status:req.body.status });

    // Fetch the updated data to confirm the change
    const updatedItem = await featureModel.findOne({ where: { country }
    });
    console.log(updatedItem, "updated");
    return res.status(200).json({ message: "Featured item updated successfully", data: updatedItem });
  } catch (error) {
    return res.status(500).json({ message: "Error updating featured item", error });
  }
};
// Delete a Featured item by ID
exports.deleteFeatured = async (req, res) => {
  try {
    const { country } = req.query;
    const featuredItem = await featureModel.findOne({ where: { country } });
    if (!featuredItem) {
      return res.status(404).json({ message: "Featured item not found" });
    }
    await featuredItem.destroy();
    return res.status(200).json({ message: "Featured item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting featured item", error });
  }
};
