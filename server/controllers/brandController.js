// controllers/brandController.js

const db = require('../models/index.js');
const { uploadOnCloudinary, deleteOnCloudinary } = require('../utils/cloudinary.js');
const brandModel = db.brandModel;
const productModel = db.productModel;
const categoryModel = db.categoryModel;
const { Op, Sequelize } = require('sequelize');

const fs = require('fs');

const getColors = require('get-image-colors');

const {getDominantColor} = require('../utils/Background.js');

const { format } = require('date-fns');

const today = new Date();

const formattedDate = format(today, 'yyyy-MM-dd');

const folderName = `Bycottapp/Brands/brandLogos/${formattedDate}`;

const readXlsxFile = require("read-excel-file/node");

// Create a new brand

// const createBrand = async (req, res) => {

//   try {

//     const { name, brand_description, category_id,country_continent,country_name,category_name } = req.body;

//     let brand_image = null;

//     let brand_image_pid;

//     let bgColor = null;

//     if (!name) {

//       return res.status(404).json({ error: 'name  is  required' });

//     }

//     const existingBrand = await brandModel.findOne({ where: { name } });

//     if (existingBrand) {

//       return res.status(409).json({ error: 'Brand with this name already exists' });

//     }

//     if (req.file) {

//       // Upload the image to Cloudinary

//       const cloudinary_res = await uploadOnCloudinary(req.file.path,folderName);

//       brand_image = cloudinary_res.url;

//       brand_image_pid=cloudinary_res.public_id

//       const  backgroundColor=await getDominantColor(brand_image)

// bgColor=backgroundColor.dominantColor



//        // Delete the file from the local file system

//        if(cloudinary_res && req.file.path){

//        fs.unlink(req.file.path, (err) => {

//         if (err) {

//           console.error('Error deleting file from local system:', err);

//         } else {

//           console.log('File deleted from local system');

//         }

//       });}

//     }

//     // Create the brand with the image URL

//     const brand = await brandModel.create({ name, brand_description, brand_image,country_name,country_continent,category_id,brand_image_pid,bgColor, category_name });

//     res.status(201).json(brand);

//   } catch (error) {

//     res.status(500).json({ error: error.message });

//   }

// };

const createBrand = async (req, res) => {

  try {

    const { name, brand_description, category_id, countries ,bgColor} = req.body; // Updated to get countries

    let brand_image = null;

    let brand_image_pid;

    // Validate required fields

    if (!name) {

      return res.status(400).json({ error: 'Name is required' });

    }

    // Check for existing brand

    const existingBrand = await brandModel.findOne({ where: { name } });

    if (existingBrand) {

      return res.status(409).json({ error: 'Brand with this name already exists' });

    }

    // Handle image upload if a file is provided

    if (req.file) {

      console.log(req.file, "req.file");

      const cloudinary_res = await uploadOnCloudinary(req.file.path, folderName);

      console.log(cloudinary_res, "cloudinary_res");

      brand_image = cloudinary_res.url;

      brand_image_pid = cloudinary_res.public_id;

      // Delete the file from the local file system

      if (cloudinary_res && req.file.path) {

        fs.unlink(req.file.path, (err) => {

          if (err) {

            console.error('Error deleting file from local system:', err);

          } else {

            console.log('File deleted from local system');

          }

        });

      }

    }

    // Parse countries from JSON

    let parsedCountries;

    if (typeof countries === 'string') {

        try {

            parsedCountries = JSON.parse(countries); // Parse JSON

        } catch (error) {

            return res.status(400).json({ error: 'Invalid countries format' });

        }

    } else if (Array.isArray(countries)) {

        parsedCountries = countries; // Already an array

    } else {

        parsedCountries = []; // Default to empty array if not provided

    }

    console.log(parsedCountries, "parsedCountries");

    // Create the brand with the provided data

    const brand = await brandModel.create({ 

      name, 

      brand_description, 

      brand_image, 

      brand_image_pid, 

      bgColor, 

      category_id, 

      countries: parsedCountries || []  // Ensure countries is parsed as an array

    });

    console.log(brand, "brand");

    // Respond with the created brand

    res.status(201).json(brand.dataValues); // Return only the dataValues for consistency

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

// Get all brands

// const getAllBrands = async (req, res) => {

//   try {

//     const brands = await brandModel.findAll();



//     res.status(200).json(brands);

//   } catch (error) {

//     res.status(500).json({ error: error.message });

//   }

// };

// const getAllBrands = async (req, res) => {

//   try {

//     // Fetch all brands

//     const brands = await brandModel.findAll();



//     // Iterate over each brand and get related products manuallyget

//     const brandWithProducts = await Promise.all(

//       brands.map(async (brand) => {

       

//         const products = await productModel.findAll({

//           where: { brand_id: brand.id }, 

//           attributes: ['product_name', 'logo'], 

//         });

//         // Attach products to the brand object

//         return {

//           ...brand.toJSON(), 

//           products, 

//         };

//       })

//     );

//     res.status(200).json(brandWithProducts);

//   } catch (error) {

//     res.status(500).json({ error: error.message });

//   }

// };

// const getAllBrands = async (req, res) => {

//   try {
//     // Get pagination parameters from the request query
//     const { page = 1, limit = 1000, productLimit = 5 } = req.query;
//     // Calculate the offset for brands pagination
//     const brandOffset = (page - 1) * limit;
//     // Fetch paginated brands
//     const { count: totalBrands, rows: brands } = await brandModel.findAndCountAll({
//       raw:true,
//       limit: parseInt(limit),

//       offset: parseInt(brandOffset),

//       order: [['name', 'ASC']], // Order by brand name

//     });

// console.log(brands, "brands");



//     // Check if there are any brands

//     if (!brands.length) {

//       return res.status(404).json({ message: 'No brands found' });

//     }

//     // Iterate over each brand and get related products with pagination for each brand

//     const brandWithProducts = await Promise.all(

//       brands.map(async (brand) => {

//         // Calculate offset for products pagination for each brand

//         const productOffset = (page - 1) * productLimit;

//         const { count: totalProducts, rows: products } = await productModel.findAndCountAll({

//           where: { brand_id: brand.id },

//           raw:true,

//           attributes: ['product_name', 'logo'], // Only fetch product names and logos

//           limit: parseInt(productLimit),

//           offset: parseInt(productOffset),

//           order: [['product_name', 'ASC']], // Order by product name

//         });

//  const fethproducts=products

//         // Attach products and total product count to the brand object

//         return {

//           ...brand,

//           products, 

//           totalProducts,

//           productPages: Math.ceil(totalProducts / productLimit), // Calculate total pages for products

//         };

//       })

//     );

//     // Response with paginated brand and product data

//     res.status(200).json({

//       totalBrands,

//       totalPages: Math.ceil(totalBrands / limit), // Total pages for brands

//       currentPage: parseInt(page),

//       brands: brandWithProducts,

//     });

//   } catch (error) {

//     res.status(500).json({ error: error.message });

//   }

// };
const getAllBrands = async (req, res) => {
  try {
    // Get pagination parameters from the request query
    const { page = 1, limit = 1000, productLimit = 5 } = req.query;
    // Calculate the offset for brands pagination
    const brandOffset = (page - 1) * limit;
    // Fetch paginated brands
    const { count: totalBrands, rows: brands } = await brandModel.findAndCountAll({
      raw: true,
      limit: parseInt(limit),
      offset: parseInt(brandOffset),
      order: [['name', 'ASC']], // Order by brand name
    });
    // Check if there are any brands
    if (!brands.length) {
      return res.status(404).json({ message: 'No brands found' });
    }
    // Iterate over each brand and get related products with pagination for each brand
    const brandWithProducts = await Promise.all(
      brands.map(async (brand) => {
        // Parse countries field if it is a JSON string
        if (typeof brand.countries === 'string') {
          try {
            brand.countries = JSON.parse(brand.countries);
          } catch (error) {
            console.error("Error parsing countries field:", error);
            brand.countries = []; // Fallback in case of parse error
          }
        }

        // Calculate offset for products pagination for each brand
        const productOffset = (page - 1) * productLimit;

        const { count: totalProducts, rows: products } = await productModel.findAndCountAll({
          where: { brand_id: brand.id },
          raw: true,
          attributes: ['product_name', 'logo','variant'], // Only fetch product names and logos
          limit: parseInt(productLimit),
          offset: parseInt(productOffset),
          order: [['product_name', 'ASC']], // Order by product name
        });
           // Parse variant field if it's in JSON string format
products.forEach(product => {
  if (typeof product.variant === 'string') {
    try {
      product.variant = JSON.parse(product.variant); // Parse the JSON string into an array
    } catch (error) {
      console.error("Failed to parse variant:", error);
      product.variant = []; // Set as empty array if parsing fails
    }
  }
});

        // Attach products and total product count to the brand object
        return {
          ...brand,
          ...brand.countries,
          products,
          totalProducts,
          productPages: Math.ceil(totalProducts / productLimit), // Calculate total pages for products
        };
      })
    );
 
    // Response with paginated brand and product data
    res.status(200).json({
      totalBrands,
      totalPages: Math.ceil(totalBrands / limit), // Total pages for brands
      currentPage: parseInt(page),
      brands: brandWithProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBrands1 = async (req, res) => {

  try {

    const brands = await brandModel.findAll(  { order: [['updatedAt', 'DESC'], ['createdAt', 'DESC']]

    } );

    res.status(200).json(brands);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

//Get a single brand by ID

const getBrandById = async (req, res) => {

  try {

    const brand = await brandModel.findByPk(req.query.id);

    if (brand) {

      res.status(200).json(brand);

    } else {

      res.status(404).json({ error: 'Brand not found' });

    }

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

// // Update a brand

// const updateBrand = async (req, res) => {

//   try {

//     console.log("object................")

//     const { name, brand_description, category_id, country_name,country_continent } = req.body;

//     let brand_image = null;

//     let brand_image_pid = null;

//     // Find the existing brand

//     let brand = await brandModel.findByPk(req.query.id);

//     if (!brand) {

//       return res.status(404).json({ error: 'Brand not found' });

//     } 

//     // Check if an image file is present in the request

//     if (req.file) {

//       // Upload the new image to Cloudinary

//       const cloudinary_res = await uploadOnCloudinary(req.file.path, folderName);

//       // Optionally delete the old image from Cloudinary

//       if (cloudinary_res) {

//         // Delete the old image from Cloudinary

//         console.log(cloudinary_res,"....................................")

//         if (brand.brand_image_pid && brand.brand_image) {

        

//          const deletedprevios= await deleteOnCloudinary(brand.brand_image_pid);

//          if(deletedprevios){

//           console.log("also deleted  previous image from cloudinay")

//          }

        

//         }

//         brand_image=cloudinary_res.url;

//         brand_image_pid=cloudinary_res.public_id;

//         }

//     }

//     // Update the brand fields

//     brand.name = name || brand.name;

//     brand.brand_description = brand_description || brand.brand_description;

//     brand.brand_image = brand_image || brand.brand_image;

//     brand.brand_image_pid = brand_image_pid || brand.brand_image_pid;

   

//     brand.category_id = category_id || brand.category_id;

//     // Save the updated brand

//     await brand.save();

//     console.log(brand,".......................brand")

//     res.status(200).json(brand);

//   } catch (error) {

//     res.status(500).json({ error: error.message });

//   }

// };

// Delete a brand

const deleteBrand = async (req, res) => {

  try {

    const deleted = await brandModel.destroy({ where: { id: req.query.id } });

    if (deleted) {

      res.status(200).json({ message: 'Brand has been deleted' });

    } else {

      res.status(404).json({ error: 'Brand not found' });

    }

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

// controllers/brandController.js

const searchBrandsByName = async (req, res) => {

    try {

      const { name } = req.query;

      if (!name) {

        return res.status(400).json({ error: 'Name  is required' });

      }

      const brands = await brandModel.findAll({

        // where: {

        //   name: {

        //     [db.Sequelize.Op.like]: `%${name}%` // Use the `like` operator for thora b match ho jaye tu

        //   }

        where: {

            name:  name // Use the `like` operator for thora b match ho jaye tu

            }

        }

      );

      if (brands.length > 0) {

        res.status(200).json(brands);

      } else {

        res.status(404).json({ message: 'No brands found' });

      }

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };

  // const getBrandsByCountry = async (req, res) => {

  //   const { page = 1, limit = 1000, country } = req.query;

  

  //   if (!country) {

  //     return res.status(400).json({ error: 'Country parameter is required' });

  //   }

  

  //   try {

  //     const offset = (page - 1) * limit;

      

  //     // Fetch brands by country

  //     const brands = await brandModel.findAndCountAll({

  //       where: { country_name: country },

  //       limit: parseInt(limit),

  //       offset: parseInt(offset),

  //       order: [['name', 'ASC']], // Adjust the order as needed

  //     });

  

  //     if (brands.count === 0) {

  //       return res.status(404).json({ error: 'No brands found for the specified country' });

  //     }

  

  //     res.status(200).json({

  //       totalItems: brands.count,

  //       totalPages: Math.ceil(brands.count / limit),

  //       currentPage: parseInt(page),

  //       result: brands.rows,

  //     });

  //   } catch (error) {

  //     res.status(500).json({ error: error.message });

  //   }

  // };

  // const getBrandsByCategory = async (req, res) => {

  //   const { page = 1, limit = 1000, category } = req.query;

  

  //   if (!category) {

  //     return res.status(400).json({ error: 'Category parameter is required' });

  //   }

  //   try {

  //     const offset = (page - 1) * limit;

  

  //     // Fetch brands by category

  //     const brands = await brandModel.findAndCountAll({

  //       where: { category_name: category }, // Adjust to the correct field if needed

  //       limit: parseInt(limit),

  //       offset: parseInt(offset),

  //       order: [['name', 'ASC']], // Adjust the order as needed

  //     });

  

  //     if (brands.count === 0) {

  //       return res.status(404).json({ error: 'No brands found for the specified category' });

  //     }

  

  //     res.status(200).json({

  //       totalItems: brands.count,

  //       totalPages: Math.ceil(brands.count / limit),

  //       currentPage: parseInt(page),

  //       result: brands.rows,

  //     });

  //   } catch (error) {

  //     res.status(500).json({ error: error.message });

  //   }

  // };

  

  const getBrandsByCountry = async (req, res) => {

    const { page = 1, limit = 1000, country } = req.query; // Default values for pagination

  

    if (!country) {

      return res.status(400).json({ error: 'Country parameter is required' });

    }

  

    try {

      const offset = (page - 1) * limit;

  

      // Define paths for continents in JSON

      const paths = [

        '$.ASIA',

        '$.AFRICA',

        '$.EUROPE',

        '$."NORTH AMERICA"',

        '$."SOUTH AMERICA"',

        '$.OCEANIA',

        '$.ANTARCTICA'

      ];

  

      // Create JSON_CONTAINS conditions for each path

      const conditions = paths.map(path =>

        Sequelize.literal(`JSON_CONTAINS(countries, JSON_QUOTE('${country}'), '${path}')`)

      );

  

      // Fetch brands by country with pagination

      const brands = await brandModel.findAndCountAll({

        where: {

          [Op.or]: conditions,

        },

        raw: true,

        limit: parseInt(limit), 

        offset: parseInt(offset), 

        order: [['name', 'ASC']], 

      });

  console.log(brands,"brands")

      // If no brands are found, return a 404 response

      if (brands.count === 0) {

        return res.status(404).json({ error: 'No brands found for the specified country' });

      }

  

      

      res.status(200).json({

        totalBrands: brands.count,

        totalPages: Math.ceil(brands.count / limit), 

        currentPage: parseInt(page),

        brands: brands.rows, 

      });

    } catch (error) {

      

      res.status(500).json({ error: error.message });

    }

  };

  const getBrandsByCategory = async (req, res) => {

    const { page = 1, limit = 1000, category } = req.query;

    if (!category) {

      return res.status(400).json({ error: 'Category parameter is required' });

    }

  

    try {

      const offset = (page - 1) * limit;

      

      // Fetch brands by category

      const brands = await brandModel.findAndCountAll({

        where: { category_id: category }, // Assuming `category_name` is correct

        limit: parseInt(limit),

        offset: parseInt(offset),

        order: [['name', 'ASC']],

        raw: true // Adjust the order as needed

      });

  

      if (brands.count === 0) {

        return res.status(404).json({ error: 'No brands found for the specified category' });

      }

  

      // For each brand, get the total count of products and product details

      const result = await Promise.all(

        brands.rows.map(async (brand) => {

          // Get total count of products for each brand

          const totalProducts = await productModel.count({

            where: { brand_id: brand.id },

          });

  

          // Fetch all products related to this brand, including product name and logo

          const products = await productModel.findAll({

            where: { brand_id: brand.id },

            raw: true,

            attributes: ['product_name', 'logo'], // Include product name and logo

          });

  

          return {

            ...brand,

            products, // Return the array of products with name and logo

            totalProducts, // Total product count for pagination if needed

            productPages: totalProducts > 0 ? Math.ceil(totalProducts / limit) : 0 // Calculate total product pages

          };

        })

      );

  

      res.status(200).json({

        totalBrands: brands.count,

        totalPages: Math.ceil(brands.count / limit),

        currentPage: parseInt(page),

        brands: result, // Result array with brands and their related products

      });

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };  

  const getBrandsByMultipleCategories = async (req, res) => {

    const { page = 1, limit = 1000, categories } = req.query;



    // Check if categories parameter is provided and it's not empty

    if (!categories || categories.length === 0) {

      return res.status(400).json({ error: 'Categories parameter is required' });

    }

    try {

      const offset = (page - 1) * limit;

  

      // Convert categories to an array if it's a string, in case it's passed as a comma-separated list

      const categoriesArray = Array.isArray(categories) ? categories : categories.split(',');

  console.log("categoriesArray",categoriesArray)

      // Fetch brands by multiple categories

      const brands = await brandModel.findAndCountAll({

        where: {

          category_name: {

            [Op.in]: categoriesArray, // Match any category in the list

          },

        },

        limit: parseInt(limit),

        offset: parseInt(offset),

        order: [['name', 'ASC']], // Adjust the order as needed

      });

      // Check if no brands are found

      if (brands.count === 0) {

        return res.status(404).json({ error: 'No brands found for the specified categories' });

      }

      // Return the result with pagination details

      res.status(200).json({

        totalItems: brands.count,

        totalPages: Math.ceil(brands.count / limit),

        currentPage: parseInt(page),

        result: brands.rows,

      });

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };

  // // exports.searchBrands = async (req, res) => {

  //   const searchBrands = async (req, res) => {

  //   try {

  //     const { Search } = req.query; // Get the search query from the request



  //     if (!Search) {

  //       return res.status(400).json({

  //         message: 'Search query is required',

  //         status: false,

  //       });

  //     }

     

  //     const matchingBrands = await brandModel.findAll({

  //       where: {

  //         [Op.or]: [

  //           { name: { [Op.like]: `%${Search}%` } }, 

  //           { brand_description: { [Op.like]: `%${Search}%` } }, 

  //           { category_name: { [Op.like]: `%${Search}%` } },

  //         ],

  //       }, raw: true,

  //         order: [['name', 'ASC']], 

  //     });



      

  //   const result = await Promise.all(

  //       brands.rows.map(async (brand) => {

  //         const productCount = await productModel.count({

  //           where: { brand_id: brand.id }, // Assuming `brand_id` links products to brands

  //         });

  

  //         const products = await productModel.findAll({

  //           where: { brand_id: brand.id },

  //           raw:true,

  //           attributes: ['product_name'], // Only fetch the product names

  //         });

  //         console.log(products,"products")

  

  //         return {

  //           ...brand.toJSON(),

  //           productCount,

  //           products: products.map(product => product.product_name), // Return the product names

  //         };

  //       })

  //     );

  //     res.status(200).json({

  //       totalItems: brands.count,

  //       totalPages: Math.ceil(brands.count / limit),

  //       currentPage: parseInt(page),

  //       result,

  //     });

  //     res.status(200).json({

  //       message: 'Matching products fetched successfully',

  //       status: true,

  //       Brands: matchingBrands ? matchingBrands: [],

  //     });

  //   } catch (error) {

  //     res.status(500).json({

  //       message: 'An error occurred while searching for Brands',

  //       status: false,

  //       error: error.message,

  //     });

  //   }

  // };

  // const searchBrands = async (req, res) => {

  //   try {

  //     const { Search } = req.query; // Get the search query from the request

  

  //     if (!Search) {

  //       return res.status(400).json({

  //         message: 'Search query is required',

  //         status: false,

  //       });

  //     }

  

  //     // Fetch matching brands based on the search query

  //     const matchingBrands = await brandModel.findAll({

  //       where: {

  //         [Op.or]: [

  //           { name: { [Op.like]: `%${Search}%` } }, 

  //           { brand_description: { [Op.like]: `%${Search}%` } }, 

  //           { category_name: { [Op.like]: `%${Search}%` } },

  //         ],

  //       },

  //       order: [['name', 'ASC']], // Sort by brand name in ascending order

  //       raw: true,

  //     });

  

  //     // If no brands are found, return an empty result

  //     if (matchingBrands.length === 0) {

  //       return res.status(200).json({

  //         message: 'No matching brands found',

  //         status: true,

  //         result: [],

  //       });

  //     }

  

  //     const result = await Promise.all(

  //       matchingBrands.map(async (brand) => {

       

  //         const productCount = await productModel.count({

  //           where: { brand_id: brand.id }, 

  //         });

  //         const products = await productModel.findAll({

  //           where: { brand_id: brand.id },

  //           attributes: ['product_name'], 

  //           raw: true,

  //         });

  //         return {

  //           ...brand, // Spread the brand details

  //           productCount, // Add the product count

  //           products: products.map(product => product.product_name), // Add the product names

  //         };

  //       })

  //     );

  //     // Return the result with brand details, product count, and product names

  //     res.status(200).json({

  //       message: 'Matching brands and products fetched successfully',

  //       status: true,

  //       result,

  //     });

  //   } catch (error) {

  //     res.status(500).json({

  //       message: 'An error occurred while searching for brands',

  //       status: false,

  //       error: error.message,

  //     });

  //   }

  // };

  // const searchBrands = async (req, res) => {

  //   try {

  //     const { Search } = req.query; // Get the search query from the request

  

  //     if (!Search) {

  //       return res.status(400).json({

  //         message: 'Search query is required',

  //         status: false,

  //       });

  //     }

  

  //     // Fetch matching brands based on the search query

  //     const matchingBrands = await brandModel.findAll({

  //       where: {

  //         [Op.or]: [

  //           { name: { [Op.like]: `%${Search}%` } },

  //           { brand_description: { [Op.like]: `%${Search}%` } },

  //           { category_name: { [Op.like]: `%${Search}%` } },

  //         ],

  //       },

  //       order: [['name', 'ASC']], // Sort by brand name in ascending order

  //       raw: true,

  //     });

  

  //     // If no brands are found, return an empty result

  //     if (matchingBrands.length === 0) {

  //       return res.status(200).json({

  //         message: 'No matching brands found',

  //         status: true,

  //         result: [],

  //       });

  //     }

  

  //     // Fetch products for each brand and construct the response

  //     const result = await Promise.all(

  //       matchingBrands.map(async (brand) => {

  //         // Fetch related products for each brand

  //         const products = await productModel.findAll({

  //           where: { brand_id: brand.id },

  //           attributes: ['product_name', 'logo'], // Fetch product names and logos

  //           order: [['product_name', 'ASC']], // Order by product name

  //           raw: true,

  //         });

  

  //         const productCount = products.length; // Get the product count

  

  //         // Return the brand with its products and product count

  //         return {

  //           ...brand, // Spread the brand details

  //           products, // Include products

  //           productCount, // Add the product count

  //         };

  //       })

  //     );

  

  //     // Return the result with brand details, product count, and product names

  //     res.status(200).json({

  //       totalBrands: matchingBrands.length, // Total matching brands

  //       brands: result, // Brands with their products

  //       message: 'Matching brands and products fetched successfully',

  //       status: true,

  //     });

  //   } catch (error) {

  //     res.status(500).json({

  //       message: 'An error occurred while searching for brands',

  //       status: false,

  //       error: error.message,

  //     });

  //   }

  // };

  const searchBrands = async (req, res) => {

    try {

      const { Search, country } = req.query; // Get the search and country query from the request

  

      // Ensure both Search and country are provided

      if (!Search || !country) {

        return res.status(400).json({

          message: 'Both search query and country are required',

          status: false,

        });

      }

  

      console.log(country, "country from query");

  

      // Formulating query conditions for each continent key

      const paths = [

        '$.ASIA',

        '$.AFRICA',

        '$.EUROPE',

        '$."NORTH AMERICA"',

        '$."SOUTH AMERICA"',

        '$.OCEANIA',

        '$.ANTARCTICA'

      ];

  

      // Prepare an array of JSON_CONTAINS conditions to filter by country

      const countryConditions = paths.map(path =>

        Sequelize.literal(`JSON_CONTAINS(countries, JSON_QUOTE('${country}'), '${path}')`)

      );

  

      // Find brands filtered by country and search term

      const matchingBrands = await brandModel.findAll({

        where: {

          [Op.and]: [

            { [Op.or]: countryConditions }, // Filter by country

            {

              [Op.or]: [

                { name: { [Op.like]: `%${Search}%` } }, // Search by brand name

                { brand_description: { [Op.like]: `%${Search}%` } }, // Search by brand description

             

              ]

            }

          ]

        },

        order: [['name', 'ASC']], 

        raw: true

      });

  

      // If no brands are found, return an empty result

      if (matchingBrands.length === 0) {

        return res.status(200).json({

          message: 'No matching brands found',

          status: true,

          result: [],

        });

      }

  

   

      const result = await Promise.all(

        matchingBrands.map(async (brand) => {

          // Fetch related products for each brand

          const products = await productModel.findAll({

            where: { brand_id: brand.id },

            attributes: ['product_name', 'logo'], 

            order: [['product_name', 'ASC']],

            raw: true,

          });

  

          const productCount = products.length; 

       

          return {

            ...brand, 

            products,

            productCount,

          };

        })

      );

  

      // Return the result with brand details, product count, and product names

      res.status(200).json({

        totalBrands: matchingBrands.length, // Total matching brands

        brands: result, // Brands with their products

        message: 'Matching brands and products fetched successfully',

        status: true,

      });

    } catch (error) {

      res.status(500).json({

        message: 'An error occurred while searching for brands',

        status: false,

        error: error.message,

      });

    }

  };



  // const getCategoriesWithBrandsByCountries = async (req, res) => {

  //   const { Categories } = req.body; // Extract Categories object from the request body

    

  //   try {

  //       // Check if Categories object is provided and is not empty

  //       if (!Categories || typeof Categories !== 'object' || Object.keys(Categories).length === 0) {

  //           return res.status(400).json({ error: 'Categories object is required to perform the search.' });

  //       }

  

  //       const result = {}; 

  

       

  //       for (const [country, categoryIds] of Object.entries(Categories)) {

  //           result[country] = []; 

  

  //           for (const categoryId of categoryIds) {

  //               // Fetch category details and brands for the current category ID and country

  //               const category = await categoryModel.findOne({

  //                   where: { id: categoryId },

  //                   attributes: ['id', 'name'], // Get category id and name

  //                   raw: true

  //               });

  // console.log([country], "country");

  //               // If category is found, proceed to fetch brands for this category and country

  //               if (category) {

  //                   const brands = await brandModel.findAll({

  //                       where: {

  //                           category_id: categoryId,

  //                           countries: { [Op.contains]: [country] }

  //                       },

  //                       attributes: ['id', 'name'], // Get brand id and name

  //                       raw: true

  //                   });

  

  //                   // Map the brands to the expected format

  //                   const brandList = brands.map(brand => ({

  //                       brand_id: brand.id,

  //                       brand_name: brand.name

  //                   }));

  

  //                   // Push the formatted category with brands into the country's array

  //                   result[country].push({

  //                       category_id: category.id,

  //                       category_name: category.name,

  //                       brands: brandList

  //                   });

  //               }

  //           }

  //       }

  

  //       // Return the structured result

  //       res.status(200).json({ data: result });

  //   } catch (error) {

  //       // Handle any errors that occur during the process

  //       console.error(error); // Log error for debugging

  //       res.status(500).json({ error: error.message });

  //   }

  // };

  //.........................

  // const getCategoriesWithBrandsByCountries = async (req, res) => {

  //   const { Categories } = req.body; 

  //   try {

  //       if (!Categories || typeof Categories !== 'object' || Object.keys(Categories).length === 0) {

  //           return res.status(400).json({ error: 'Categories object is required to perform the search.' });

  //       }

  //       const result = {}; 

  //       const continentsPaths = [

  //           '$.ASIA', '$.AFRICA', '$.EUROPE',

  //           '$."NORTH AMERICA"', '$."SOUTH AMERICA"',

  //           '$.OCEANIA', '$.ANTARCTICA'

  //       ];

  //       for (const [country, categoryIds] of Object.entries(Categories)) {

  //           result[country] = [];

  

  //           for (const categoryId of categoryIds) {

  //               const category = await categoryModel.findOne({

  //                   where: { id: categoryId },

  //                   attributes: ['id', 'name'],

  //                   raw: true

  //               });

  //               if (category) {

  //                   // const countryConditions = continentsPaths.map(path => 

  //                   //     Sequelize.literal(`JSON_CONTAINS(countries, JSON_QUOTE('${country}'), '${path}')`)

  //                   // );

  //                   const countryConditions = continentsPaths.map(path => 

  //                     Sequelize.literal(`JSON_CONTAINS(LOWER(JSON_UNQUOTE(JSON_EXTRACT(countries, '${path}'))), LOWER(JSON_QUOTE('${country}')))`)

  //                   );

  //                   const brands = await brandModel.findAll({

  //                       where: {

  //                           category_id: categoryId,

  //                           [Op.or]: countryConditions 

  //                       },

  //                       attributes: ['id', 'name'], 

  //                       raw: true

  //                   });

  

  //                   const brandList = brands.map(brand => ({

  //                       brand_id: brand.id,

  //                       brand_name: brand.name

  //                   }));

  //                   result[country].push({

  //                       category_id: category.id,

  //                       category_name: category.name,

  //                       brands: brandList

  //                   });

  //               }

  //           }

  //       }

  //       console.log("result",result, 'result');

  //       res.status(200).json({ data: result });

  //   } catch (error) {

  //       console.error(error); 

  //       res.status(500).json({ error: error.message });

  //   }

  // };

  const getCategoriesWithBrandsByCountries = async (req, res) => {

    const { Categories } = req.body; 

    try {

        // Validate input

        if (!Categories || typeof Categories !== 'object' || Object.keys(Categories).length === 0) {

            return res.status(400).json({ error: 'Categories object is required to perform the search.' });

        }



        const result = {}; 

        const continentsPaths = [

            '$.ASIA', '$.AFRICA', '$.EUROPE',

            '$."NORTH AMERICA"', '$."SOUTH AMERICA"',

            '$.OCEANIA', '$.ANTARCTICA'

        ];



        // Iterate through each country in the Categories object

        for (const [country, categoryIds] of Object.entries(Categories)) {

            result[country] = [];  // Initialize array for each country



            // Iterate through each category ID for the current country

            for (const categoryId of categoryIds) {

                const category = await categoryModel.findOne({

                    where: { id: categoryId },

                    attributes: ['id', 'name'], // Fetching id and name

                    raw: true

                });



                if (category) {

                    // Construct country conditions for the query

                    const countryConditions = continentsPaths.map(path => 

                        Sequelize.literal(`JSON_CONTAINS(LOWER(JSON_UNQUOTE(JSON_EXTRACT(countries, '${path}'))), LOWER(JSON_QUOTE('${country}')))`));



                    // Fetch brands based on the category ID and country conditions

                    const brands = await brandModel.findAll({

                        where: {

                            category_id: categoryId,

                            [Op.or]: countryConditions 

                        },

                        attributes: ['id', 'name'], 

                        raw: true

                    });



                    // Map brands to the desired format

                    const brandList = brands.map(brand => ({

                        brand_id: brand.id,

                        brand_name: brand.name

                    }));



                    // Push the category with the required format to the result

                    result[country].push({

                        category_id: category.id,  // Change here to match required output

                        category_name: category.name, // Change here to match required output

                        brands: brandList

                    });

                }

            }

        }

        console.log("result", result); // Log the result for debugging

        res.status(200).json({ data: result }); // Send response

    } catch (error) {

        console.error(error); // Log error for debugging

        res.status(500).json({ error: error.message }); // Send error response

    }

};

  const getProductsByBrandsInCountries = async (req, res) => {

    const { brands } = req.body; 

  console.log(brands, 'brands');

    try {

      if (!brands || typeof brands !== 'object' || Object.keys(brands).length === 0) {

        return res.status(400).json({ error: 'Brands object is required to perform the search.' });

      }

      const result = {};

      const continentsPaths = [

        '$.ASIA', '$.AFRICA', '$.EUROPE',

        '$."NORTH AMERICA"', '$."SOUTH AMERICA"',

        '$.OCEANIA', '$.ANTARCTICA'

    ];

      for (const [country, brandIds] of Object.entries(brands)) {

        result[country] = [];

        for (const brandId of brandIds) {

          const brand = await brandModel.findOne({

            where: { id: brandId },

            attributes: ['id', 'name', 'category_id'],

            raw: true

          });

  console.log(brand, 'brand');

          if (brand) {

          //   const countryConditions = continentsPaths.map(path => 

          //     Sequelize.literal(`JSON_CONTAINS(countries, JSON_QUOTE('${country}'), '${path}')`)

          // );

          const countryConditions = continentsPaths.map(path => 

            Sequelize.literal(`JSON_CONTAINS(LOWER(JSON_UNQUOTE(JSON_EXTRACT(countries, '${path}'))), LOWER(JSON_QUOTE('${country}')))`)

          );

            // Fetch products for the brand

            const products = await productModel.findAll({

              where: { brand_id: brandId },

              attributes: ['id', 'product_name'],

              raw: true

            });

            // Map products to the desired format

            const productList = products.map(product => ({

              product_id: product.id,

              product_name: product.product_name

            }));

            // Check if the category already exists in the result

            let category = result[country].find(

              (cat) => cat.category_id === brand.category_id

            );

            // If category does not exist, create a new one

            if (!category) {

              const categoryData = await categoryModel.findOne({

                where: { id: brand.category_id },

                attributes: ['id', 'name'],

                raw: true

              });

              if (categoryData) {

                category = {

                  category_id: categoryData.id,

                  category_name: categoryData.name,

                  brands: []

                };

                result[country].push(category);

              }

            }

            // Add brand with its products to the category's brands array

            if (category) {

              category.brands.push({

                brand_id: brand.id,

                brand_name: brand.name,

                products: productList

              });

            }

          }

        }

      }

      // Return the structured result

      res.status(200).json({ data: result });

    } catch (error) {

      // Handle any errors that occur during the process

      console.error(error); // Log error for debugging

      res.status(500).json({ error: error.message });

    }

  };

  // const uploadBrandSheet = async (req, res) => {

  //   try {

  //     if (!req.file) {

  //       return res.status(400).send("Please upload an Excel file!");

  //     }

  //     const filePath = req.file.path;

  //     const rows = await readXlsxFile(filePath);

  //     const categoryNames = new Set(rows.slice(1).map(row => row[1]));

  //     const categories = await Category.findAll({

  //       attributes: ['id', 'name'],

  //       where: {

  //         name: {

  //           [Op.in]: Array.from(categoryNames),

  //         },

  //       },

  //     });

  //     // Create a mapping from category names to category IDs

  //     const categoryMap = categories.reduce((map, category) => {

  //       map[category.name] = category.id;

  //       return map;

  //     }, {});

  //     // Prepare brand data with the category ID

  //     const brands = rows.slice(1).map(row => {

  //       const categoryName = row[1];

  //       return {

  //         name: row[0],

  //         category_name: categoryName,

  //         category_id: categoryMap[categoryName] || null, 

  //         description: row[2],  

  //         logo: row[3],         

  //         bgColor: row[4],

  //       };

  //     });

  //     // Clean up: Delete the file after processing

  //     if (fs.existsSync(filePath)) {

  //       fs.unlinkSync(filePath);

  //       console.log(`File ${filePath} is deleted!`);

  //     } else {

  //       console.log(`File ${filePath} does not exist.`);

  //     }

  //     // Bulk create brands in the database

  //     const result = await Brand.bulkCreate(brands);

  //     if (result) {

  //       res.status(200).send({

  //         message: "Brand sheet uploaded and processed successfully.",

  //         brands,

  //       });

  //     } else {

  //       res.status(400).json({

  //         message: "Could not import brands.",

  //         status: false,

  //       });

  //     }

  //   } catch (error) {

  //     console.error(error.message);

  

  //     // Clean up: Delete the file if an error occurs

  //     if (req.file && req.file.path) {

  //       try {

  //         if (fs.existsSync(req.file.path)) {

  //           fs.unlinkSync(req.file.path);

  //           console.log(`File ${req.file.path} deleted due to error.`);

  //         }

  //       } catch (unlinkError) {

  //         console.error(`Error removing file: ${unlinkError.message}`);

  //       }

  //     }

  

  //     res.status(500).send({

  //       message: "Could not upload the file: " + req.file.originalname,

  //     });

  //   }

  // };

 

const uploadBrandSheet = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).send("Please upload an Excel file!");

    }

console.log("...........................")

    const filePath = req.file.path;

    const rows = await readXlsxFile(filePath);



    const categoryNames = new Set(rows.slice(1).map(row => row[2])); // Get unique category names from the sheet



    // Fetch category IDs based on the category names

    const categories = await categoryModel.findAll({

      attributes: ['id', 'name'],

      where: {

        name: {

          [Op.in]: Array.from(categoryNames),

        },

      },

    });

    // Create a mapping from category names to category IDs

    const categoryMap = categories.reduce((map, category) => {

      map[category.name] = category.id;

      return map;

    }, {});

    // Map Excel rows to brand objects for bulk creation

    const brands = rows.slice(1).map(row => {

      const categoryName = row[2];

      return {

        name: row[0],

        brand_image: row[1],

        category_name: categoryName,

        category_id: categoryMap[categoryName] || null, 

        countries: JSON.parse(row[3]), 

        bgColor: row[4],

      };

    });

    // Delete the file after processing

    if (fs.existsSync(filePath)) {

      fs.unlinkSync(filePath);

      console.log(`File ${filePath} is deleted!`);

    } else {

      console.log(`File ${filePath} does not exist.`);

    }



    // Bulk create brands in the database

    const result = await brandModel.bulkCreate(brands);

    if (result) {

      res.status(200).send({

        message: "File Uploaded and Brands Processed Successfully.",

        brands,

      });

    } else {

      res.status(400).json({

        message: "Could not import Brands.",

        status: false,

      });

    }

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

      message: "Could not upload the file: " + req.file.originalname,

    });

  }

};

const updateBrandImage = async (req, res) => {

  try {

    const { id } = req.query;

    let brand_image = null;

    let brand_image_pid = null;



    // Find the existing brand

    let brand = await brandModel.findByPk(id);

    if (!brand) {

      return res.status(404).json({ error: 'Brand not found' });

    }

    // Check if an image file is present in the request

    if (req.file) {

      // Upload the new image to Cloudinary

      const cloudinary_res = await uploadOnCloudinary(req.file.path, folderName);



      if (cloudinary_res) {

        // Optionally delete the old image from Cloudinary

        if (brand.brand_image_pid) {

          const deletedPrevious = await deleteOnCloudinary(brand.brand_image_pid);

          if (deletedPrevious) {

            console.log("Previous image deleted from Cloudinary.");

          }

        }

        // Update brand image URL and public ID

        brand_image = cloudinary_res.url;

        brand_image_pid = cloudinary_res.public_id;

      }

    } else {

      return res.status(400).json({ error: 'Please upload an image file.' });

    }



    // Update the brand's image fields

    brand.brand_image = brand_image;

    brand.brand_image_pid = brand_image_pid;

    await brand.save();



    res.status(200).json({

      message: "Brand image updated successfully.",

      brand_image: brand.brand_image,

      brand_image_pid: brand.brand_image_pid,

    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

const updateBrand = async (req, res) => {

  try {

    const { id } = req.query;
    if (!id) {

      return res.status(400).json({ error: 'Brand ID is required.' });

    }



    // Find the existing brand

    let brand = await brandModel.findByPk(id);

    if (!brand) {

      return res.status(404).json({ error: 'Brand not found' });

    }

    // Update only the provided fields (excluding image-related fields)

    Object.keys(req.body).forEach((key) => {

      if (key !== 'brand_image' && key !== 'brand_image_pid' && req.body[key] !== undefined) {

        brand[key] = req.body[key];

      }

    });
    // Save the updated brand details
    await brand.save();
    res.status(200).json({
      message: "Brand details updated successfully.",
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

const deleteBrandImage = async (req, res) => {
  try {
    const { id } = req.query;

    // Find the existing brand
    const brand = await brandModel.findByPk(id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check if the brand has an image to delete
    if (brand.brand_image_pid) {
      // Delete the image from Cloudinary
      const deletedImage = await deleteOnCloudinary(brand.brand_image_pid);

      if (deletedImage) {
        console.log("Brand image deleted from Cloudinary.");
      } else {
        return res.status(500).json({ error: 'Failed to delete the brand image from Cloudinary.' });
      }

      // Set image fields to null
      brand.brand_image = null;
      brand.brand_image_pid = null;
      await brand.save();

      res.status(200).json({
        message: "Brand image deleted successfully.",
      });
    } else {
      res.status(400).json({ error: "No image found for this brand." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  uploadBrandSheet,
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrandImage,
  updateBrand,
  deleteBrandImage,
  deleteBrand,
  searchBrandsByName,
  getAllBrands1,
  getBrandsByCountry,
  getBrandsByCategory,
  getBrandsByMultipleCategories,
  searchBrands,

  getCategoriesWithBrandsByCountries,

  getProductsByBrandsInCountries

};

