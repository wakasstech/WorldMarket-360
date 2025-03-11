const db = require('../models/index.js');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const categoryModel = db.categoryModel;

const brandModel = db.brandModel;
const productModel = db.productModel;

const {uploadOnCloudinary,deleteOnCloudinary} = require('../utils/cloudinary.js');

const readXlsxFile = require("read-excel-file/node");

const fs = require('fs'); 

const { format } = require('date-fns'); 

const { Op, Sequelize } = require('sequelize');

const today = new Date();

const formattedDate = format(today, 'yyyy-MM-dd'); 

const folderName = 

    `Bycottapp/Category/categoryLogos/${formattedDate}`;

// const createCategory = async (req, res) => {

//     try {

//       const { name, category_description ,bgColor } = req.body;

//       if (!name) {

//         return res.status(404).json({ error: 'name  is  required' });

//       }

//       let category_image = null;

//      let  category_image_pid;

//  // Check if a category with the same name already exists

//  const existingCategory = await categoryModel.findOne({ where: { name } });

//  if (existingCategory) {

//    return res.status(409).json({ error: 'Category with this name already exists' });

//  }

//       // Check if an image file is present in the request

//       if (req.file) {

//         // Upload the image to Cloudinarys

//        console.log(req.file,"req.file")

//         const cloudinary_res = await uploadOnCloudinary(req.file.path,folderName);

//         console.log(cloudinary_res,"cloudinary_res")

//         category_image=cloudinary_res.url,

//         category_image_pid=cloudinary_res.public_id

//         console.log(category_image,"category_image")

//         if(cloudinary_res && req.file.path ){

       

//             fs.unlink(req.file.path, (err) => {

//              if (err) {

//                console.error('Error deleting file from local system:', err);

//              } else {

//                console.log('File deleted from local system');

//              }

//            });

//         }

//       }

//       console.log(bgColor,"bgColor")

//       // Create the category with the image URL

//       const category = await categoryModel.create({ name, category_description, category_image,category_image_pid, bgColor });

//       res.status(201).json(category);

//     } catch (error) {

//       res.status(500).json({ error: error.message });

//     }

//  };

const createCategory = async (req, res) => {

    try {

        const { name, category_description, bgColor, countries } = req.body;



        if (!name) {

            return res.status(404).json({ error: 'name is required' });

        }



        let category_image = null;

        let category_image_pid;



        // Check if a category with the same name already exists

        const existingCategory = await categoryModel.findOne({ where: { name } });

        if (existingCategory) {

            return res.status(409).json({ error: 'Category with this name already exists' });

        }



        // Check if an image file is present in the request

        if (req.file) {

            console.log(req.file, "req.file");

            const cloudinary_res = await uploadOnCloudinary(req.file.path, folderName);

            console.log(cloudinary_res, "cloudinary_res");

            category_image = cloudinary_res.url;

            category_image_pid = cloudinary_res.public_id;

            console.log(category_image, "category_image");



            // Remove the file from the local system after upload

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

          // Ensure countries is a parsed array

          let parsedCountries;

          if (typeof countries === 'string') {

              parsedCountries = JSON.parse(countries);  

          } else {

              parsedCountries = countries; 

          }



        // Create the category with the image URL and countries

        const category = await categoryModel.create({

            name,

            category_description,

            category_image,

            category_image_pid,

            bgColor,

            countries: countries ? parsedCountries : [],  // Ensure `countries` is a parsed JSON array

        });

       

     

        res.status(201).json(category.dataValues);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};

//Corrected but without Associations 

// const getAllCategories = async (req, res) => {

//     try {

//       const categories = await categoryModel.findAll({raw:true});

//       res.status(200).json(categories);

//     } catch (error) {

//       res.status(500).json({ error: error.message });

//     }

//   };

// const getAllCategories = async (req, res) => {
//   try {
//     const categories = await categoryModel.findAll({ raw: true });

//     // Parse 'countries' field for each category if it is in JSON string format
//     const formattedCategories = categories.map(category => {
//       if (typeof category.countries === 'string') {
//         try {
//           category.countries = JSON.parse(category.countries);
//         } catch (error) {
//           console.error("Error parsing countries field:", error);
//           category.countries = []; // Fallback in case of parse error
//         }
//       }
//       return category;
//     });

//     res.status(200).json(formattedCategories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const getAllCategories = async (req, res) => {
  try {
      // Fetch categories along with related brand and product counts
      const categories = await categoryModel.findAll({
          include: [
              {
                  model: brandModel,
                  attributes: [],
                  as: 'brands',
                  required: false
              },
              {
                  model: productModel,
                  attributes: [],
                  as: 'products',
                  required: false
              }
          ],
          attributes: {
              include: [
                  [Sequelize.fn("COUNT", Sequelize.col("brands.id")), "brandCount"],
                  [Sequelize.fn("COUNT", Sequelize.col("products.id")), "productCount"],
                  "countries" // Include the countries field in the results
              ],
          },
          group: ['category.id'],
          raw: true
      });

      
      // Process each category to count the number of countries
      const categoriesWithCountryCount = categories.map(category => {
          const countryData = category.countries;

          // Parse JSON if `countries` is stored as JSON in the database
          let totalCountries = 0;
          if (countryData) {
            console.log(countryData, "countryData");
              // Parse the JSON to an object
             // const countriesObject = JSON.parse(countryData);

              // Flatten the arrays and count the total number of countries
              totalCountries = Object.values(countryData).reduce(
                  (acc, countryArray) => acc + (countryArray ? countryArray.length : 0), 
                  0
              );
          }
 // Process each category to parse the countries field
 const categoriesWithoutSlashes = categories.map(category => {
  let parsedCountries = null;

  if (category.countries) {
      try {
          // Parse the JSON string to remove slashes
          parsedCountries = JSON.parse(category.countries);
      } catch (error) {
          console.error("Error parsing country data:", error);
          parsedCountries = category.countries; // Keep original if parsing fails
      }
  }

  // Return updated category object with parsed countries
  return {
      ...category,
      countries: parsedCountries // Replace string with parsed object
  };
});
          // Add totalCountries count to the category object
          return { 
              ...category, 
              totalCountries 
          };
      });
 // Process each category to parse the countries field
 const categoriesWithoutSlashes = categories.map(category => {
  let parsedCountries = null;

  if (category.countries) {
      try {
          // Parse the JSON string to remove slashes
          parsedCountries = JSON.parse(category.countries);
      } catch (error) {
          console.error("Error parsing country data:", error);
          parsedCountries = category.countries; // Keep original if parsing fails
      }
  }

  // Return updated category object with parsed countries
  return {
      ...category,
      countries: parsedCountries // Replace string with parsed object
  };
});
      // Send response with category data including brandCount, productCount, and totalCountries
      res.status(200).json(categoriesWithoutSlashes);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

  const getAllCategories1 = async (req, res) => {

    try {

      const categories = await categoryModel.findAll(

       { order: [['updatedAt', 'DESC'], ['createdAt', 'DESC']]

        }    );

      res.status(200).json(categories);

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };
  const getCategoryById = async (req, res) => {

    try {

        console.log(req.query.id)

      const category = await categoryModel.findByPk(req.query.id);

      console.log("category",category)

      if (category) {

        res.status(200).json({category});

      } else {

        res.status(404).json({ error: 'Category not found' });

      }

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };

  

  const updateCategory = async (req, res) => {

    try {

      const { name, category_description } = req.body;

      let category_image = null;

      let category_image_pid = null;

  

      // Find the existing category

      const category = await categoryModel.findByPk(req.query.id);

      if (!category) {

        return res.status(404).json({ error: 'Category not found' });

      }

  console.log('CategoryImage',req.file)

      // Check if an image file is present in the request

      if (req.file) {

        // Upload the new image to Cloudinary

        const cloudinary_res = await uploadOnCloudinary(req.file.path,folderName);

        category_image = cloudinary_res.url;

        category_image_pid = cloudinary_res.public_id;

  

        // Optionally delete the old image from Cloudinary

        if (category.category_image_pid) {

          const deletedPrevious = await deleteOnCloudinary(category.category_image_pid);

          if (deletedPrevious) {

            console.log("Deleted previous image from Cloudinary");

          }

        }

        // Delete the local file after uploading to Cloudinary

        if (req.file.path) {

          fs.unlink(req.file.path, (err) => {

            if (err) {

              console.error('Error deleting file from local system:', err);

            } else {

              console.log('File deleted from local system');

            }

          });

        }

      } else {

        // Use the existing image if no new image is provided

        category_image = category.category_image;

        category_image_pid = category.category_image_pid;

      }

      // Update the category fields

      category.name = name || category.name;

      category.category_description = category_description || category.category_description;

      category.category_image = category_image;

      category.category_image_pid = category_image_pid;

  

      // Save the updated category

      await category.save();

      res.status(200).json({

        message: "Categor details updated successfully.",

     

      });

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };

  const deleteCategory = async (req, res) => {

    try {

      const deleted = await categoryModel.destroy({ where: { id: req.query.id } });

      if (deleted) {

        res.status(204).json("category has been deleted");

      } else {

        res.status(404).json({ error: 'Category not found' });

      }

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };

  // controllers/categoryController.js

const searchCategoriesByName = async (req, res) => {

    try {

      const { name } = req.query;

      if (!name) {

        return res.status(400).json({ error: 'Name query  is required' });

      }

   

    const categories = await categoryModel.findAll({

        where: {

          name: 

            name

        }

      });

      if (categories.length > 0) {

        res.status(200).json(categories);

      } else {

        res.status(404).json({ message: 'No categories found' });

      }

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };

  const SearchBrandByCategory = async (req, res) => {

    try {

      const { category_id } = req.query;

      if (!category_id) {

        return res.status(400).json({ error:'categoryId  is required' });

      }

    //   const categories = await categoryModel.findAll({

    //     where: {

    //       name: {

    //         [db.Sequelize.Op.like]: `%${name}%` // Use the `like` operator for thora b match ho jay tu le aa

    //       }

    //     }

   console.log("categoryid and this searching function",category_id)

      const brands=await brandModel.findAll({where:{category_id:category_id}})

      if (brands) {

        res.status(200).json(brands);

      } else {

        res.status(404).json({ message: 'No categories found' });

      }

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };

  const SearchBrandByCategory1 = async (req, res) => {

    try {

      const { name } = req.query;

  

      if (!name) {

        return res.status(400).json({ error: 'Name query is required' });

      }

     



      // Find the category with the given name

      const category = await categoryModel.findOne({

        where: { name },

        attributes: ['id'], // Only select the 'id' field

        include: {

          model: brandModel,

          attributes: ['id', 'name', 'brand_description', 'brand_image'], // Select only necessary fields

        }

      });

      

  return

      if (!category) {

        return res.status(404).json({ message: 'Category not found' });

      }

      // Extract the brands from the category

      const brands = category.brands;

      res.status(200).json(brands);

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };

  const getCategoryByName = async (req, res) => {

    try {

      const { name } = req.query; // Get name from query parameters

      if (!name) {

        return res.status(400).json({ error: 'Name query parameter is required' });

      }

      const category = await categoryModel.findOne({ where: { name } });

      if (category) {

        res.status(200).json({ category });

      } else {

        res.status(404).json({ error: 'Category not found' });

      }

    } catch (error) {

      res.status(500).json({ error: error.message });

    }

  };

  //  const searchcategories =async (req, res) => {

  //   try {

  //     const { Search } = req.query; // Get the search query from the request

  //     if (!Search) {

  //       return res.status(400).json({

  //         message: 'Search query is required',

  //         status: false,

  //       });

  //     }

  //     const matchingCategories = await categoryModel.findAll({

  //       where: {

  //         [Op.or]: [

  //           { name: { [Op.like]: `%${Search}%` } }, 

  //           { category_description: { [Op.like]: `%${Search}%` } }, 

  //         ],

  //       }, raw: true

  //     });

  //     res.status(200).json({

  //       message: 'Matching products fetched successfully',

  //       status: true,

  //       Categories: matchingCategories ? matchingCategories: [],

  //     });

  //   } catch (error) {

  //     res.status(500).json({

  //       message: 'An error occurred while searching for Brands',

  //       status: false,

  //       error: error.message,

  //     });

  //   }

  // };

  

  const searchcategories = async (req, res) => {

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

  

      // Find categories filtered by country and search term

      const matchingCategories = await categoryModel.findAll({

        where: {

          [Op.and]: [

            { [Op.or]: countryConditions }, // Filter by country

            {

              [Op.or]: [

                { name: { [Op.like]: `%${Search}%` } }, // Search by name

                { category_description: { [Op.like]: `%${Search}%` } }, // Search by description

              ]

            }

          ]

        },

        raw: true

      });

  

      // Return the search results

      res.status(200).json({

        message: 'Matching categories fetched successfully',

        status: true,

        Categories: matchingCategories.length > 0 ? matchingCategories : [],

      });

    } catch (error) {

      res.status(500).json({

        message: 'An error occurred while searching for categories',

        status: false,

        error: error.message,

      });

    }

  }; 

  

  // const uploadExcelSheet = async (req, res) => {

  //   try {

  //     if (!req.file) {

  //       return res.status(400).send("Please upload an excel file!");

  //     }

  

  //     const filePath = req.file.path;

  //     const rows = await readXlsxFile(filePath);

  

  //     const categories = rows.slice(1).map(row => {

  //       let countries = row[2];

  

  //       // Parse countries only if it's a string that looks like JSON

  //       if (typeof countries === "string" && (countries.startsWith("[") || countries.startsWith("{"))) {

  //         try {

  //           countries = JSON.parse(countries); // Parse JSON-like strings

  //         } catch (error) {

  //           console.error("Error parsing 'countries' JSON:", error.message);

  //           throw new Error("Invalid JSON format in 'countries' column.");

  //         }

  //       }

  

  //       return {

  //         name: row[0],

  //         category_image: row[1],

  //         countries, // Directly assign as JSON

  //         bgColor: row[3],

  //       };

  //     });

  

  //     console.log("Processed Categories:", categories);

  

  //     // Insert into the database

  //     const result = await categoryModel.bulkCreate(categories);

  

  //     // Delete the file after processing

  //     if (fs.existsSync(filePath)) {

  //       fs.unlinkSync(filePath);

  //       console.log(`File ${filePath} deleted after processing.`);

  //     }

  

  //     res.status(200).json({

  //       message: "File uploaded and processed successfully.",

  //       result

  //     });

  //   } catch (error) {

  //     console.error("Upload error:", error.message);

  

  //     if (req.file && fs.existsSync(req.file.path)) {

  //       fs.unlinkSync(req.file.path);

  //       console.log(`File ${req.file.path} deleted due to error.`);

  //     }

  

  //     res.status(500).json({

  //       message: `Failed to upload the file: ${req.file ? req.file.originalname : "unknown"}`,

  //       error: error.message

  //     });

  //   }

  // };

  

  // const uploadExcelSheet = async (req, res) => {

  //   try {

  //     if (!req.file) {

  //       return res.status(400).send("Please upload an excel file!");

  //     }

  

  //     const filePath = req.file.path;

  //     const rows = await readXlsxFile(filePath);

  

  //     const categories = rows.slice(1).map(row => {

  //       let countries = row[2];

  

  //       // Parse countries only if it's a string that looks like JSON

  //       if (typeof countries === "string" && (countries.startsWith("[") || countries.startsWith("{"))) {

  //         try {

  //           countries = JSON.parse(countries); // Parse JSON-like strings

  //         } catch (error) {

  //           console.error("Error parsing 'countries' JSON:", error.message);

  //           throw new Error("Invalid JSON format in 'countries' column.");

  //         }

  //       }

  //       return {

  //         name: row[0],

  //         category_image: row[1],

  //         countries, // Directly assign as JSON

  //         bgColor: row[3],

  //       };

  //     });

  

  //     console.log("Processed Categories:", categories);

  

  //     // Insert into the database

  //     const result = await categoryModel.bulkCreate(categories);

  

  //     // Delete the file after processing

  //     if (fs.existsSync(filePath)) {

  //       fs.unlinkSync(filePath);

  //       console.log(`File ${filePath} deleted after processing.`);

  //     }

  

  //     res.status(200).json({

  //       message: "File uploaded and processed successfully.",

  //       result

  //     });

  //   } catch (error) {

  //     console.error("Upload error:", error.message);

  

  //     if (req.file && fs.existsSync(req.file.path)) {

  //       fs.unlinkSync(req.file.path);

  //       console.log(`File ${req.file.path} deleted due to error.`);

  //     }

  

  //     res.status(500).json({

  //       message: `Failed to upload the file: ${req.file ? req.file.originalname : "unknown"}`,

  //       error: error.message

  //     });

  //   }

  // };

  // const uploadExcelSheet = async (req, res) => {

  //   try {

  //     if (!req.file) {

  //       return res.status(400).send("Please upload an excel file!");

  //     }

  

  //     const filePath = req.file.path;

  //     const rows = await readXlsxFile(filePath);

  

  //     const categories = rows.slice(1).map(row => {

  //       let countries = row[2];

  

  //       // Check if 'countries' is a string and if it looks like JSON, then parse

  //       if (typeof countries === "string" && (countries.startsWith("[") || countries.startsWith("{"))) {

  //         try {

  //           console.log("JSON.stringify")

  //           countries = JSON.parse(countries);

  //         } catch (error) {

  //           console.error("Error parsing 'countries' JSON:", error.message);

  //           throw new Error("Invalid JSON format in 'countries' column.");

  //         }

  //       }

  

  //       return {

  //         name: row[0],

  //         category_image: row[1],

  //         countries,  

  //         bgColor: row[3],

  //       };

  //     });

  

  //     // Bulk create categories in the database

  //     const result = await categoryModel.bulkCreate(categories);

  

  //     // Delete the file after processing

  //     if (fs.existsSync(filePath)) {

  //       fs.unlinkSync(filePath);

  //       console.log(`File ${filePath} deleted after processing.`);

  //     }

  

  

  //     res.status(200).json(

  //       result

  //     );

  //   } catch (error) {

  //     console.error("Upload error:", error.message);

  

  //     // Clean up file if there was an error

  //     if (req.file && fs.existsSync(req.file.path)) {

  //       fs.unlinkSync(req.file.path);

  //       console.log(`File ${req.file.path} deleted due to error.`);

  //     }

  

  //     res.status(500).json({

  //       message: `Failed to upload the file: ${req.file ? req.file.originalname : "unknown"}`,

  //       error: error.message

  //     });

  //   }

  // };

  const uploadExcelSheet = async (req, res) => {

    try {

      if (!req.file) {

        return res.status(400).send("Please upload an excel file!");

      }

  

      const filePath = req.file.path;

      const rows = await readXlsxFile(filePath);

  

      const categories = rows.slice(1).map(row => {

        let countries = row[2];

  

        // Check if 'countries' is a string and if it looks like JSON, then parse

        if (typeof countries === "string" && (countries.startsWith("[") || countries.startsWith("{"))) {

          try {

            countries = JSON.parse(countries);

          } catch (error) {

            console.error("Error parsing 'countries' JSON:", error.message);

            throw new Error("Invalid JSON format in 'countries' column.");

          }

        }

  

        return {

          name: row[0],

          category_image: row[1],

          countries,

          bgColor: row[3],

        };

      });

  

      // Bulk create categories in the database

      const result = await categoryModel.bulkCreate(categories);

  

      // Format the result to include countries properly

      const formattedResult = result.map(category => {

        return {

          id: category.dataValues.id,

          name: category.dataValues.name,

          category_image: category.dataValues.category_image,

          countries: category.dataValues.countries, // or extract details as needed

          bgColor: category.dataValues.bgColor,

          createdAt: category.dataValues.createdAt,

          updatedAt: category.dataValues.updatedAt

        };

      });
//...........................Rizwanaa...............................
  

      // Delete the file after processing

      if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);

        console.log(`File ${filePath} deleted after processing.`);

      }

  

      res.status(200).json(formattedResult);

    } catch (error) {

      console.error("Upload error:", error.message);

  

      // Clean up file if there was an error

      if (req.file && fs.existsSync(req.file.path)) {

        fs.unlinkSync(req.file.path);

        console.log(`File ${req.file.path} deleted due to error.`);

      }

  

      res.status(500).json({

        message: `Failed to upload the file: ${req.file ? req.file.originalname : "unknown"}`,

        error: error.message

      });

    }

  };

  

  

  const getCategoriesByCountry = async (req, res) => {



    const { country } = req.query; // Extract country from query parameters

    try {

        // Check if the country is provided in the query

        if (!country) {

            return res.status(400).json({ error: 'Country is required to perform the search.' });

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

      ]

        // Prepare an array of JSON_CONTAINS conditions

        const conditions = paths.map(path => 

            Sequelize.literal(`JSON_CONTAINS(countries, JSON_QUOTE('${country}'), '${path}')`)

        );

       console.log(conditions, "conditions");

        const categories = await categoryModel.findAll({

            where: {

                [Op.or]: conditions,

            },

            raw: true // Ensure raw results

        });

console.log(categories, "categories");

        // If no categories are found, return a 404 error

        if (categories.length === 0) {

            return res.status(404).json({ message: 'No categories found for the specified country' });

        }



     



        

        res.status(200).json( categories );

    } catch (error) {

        // Handle any errors that occur during the process

        console.error(error); // Log error for debugging

        res.status(500).json({ error: error.message });

    }

};

// const getCategoriesByCountries = async (req, res) => {

//   const { countries } = req.body; // Extract countries array from the request body

//   try {

//       // Check if countries array is provided and is not empty

//       if (!Array.isArray(countries) || countries.length === 0) {

//           return res.status(400).json({ error: 'Countries array is required to perform the search.' });

//       }



//       console.log(countries, "countries from payload");



//       // Define paths to check each continent key

//       const paths = [

//           '$.ASIA',

//           '$.AFRICA',

//           '$.EUROPE',

//           '$."NORTH AMERICA"',

//           '$."SOUTH AMERICA"',

//           '$.OCEANIA',

//           '$.ANTARCTICA'

//       ];



//       // Initialize an empty result object to store categories by country

//       const result = {};

//       // Iterate through each country and fetch categories for each one separately

//       for (const country of countries) {

//           // Prepare conditions for each path using JSON_CONTAINS

//           // const conditions = paths.map(path => 

//           //     Sequelize.literal(`JSON_CONTAINS(countries, JSON_QUOTE('${country}'), '${path}')`)

//           // );

//           const conditions = paths.map(path => 

//             Sequelize.literal(`JSON_CONTAINS(LOWER(JSON_UNQUOTE(JSON_EXTRACT(countries, '${path}'))), LOWER(JSON_QUOTE('${country}')))`)



//           );

//           // Query categories matching the current country

//           const categories = await categoryModel.findAll({

//               where: {

//                   [Op.or]: conditions,

//               },

//               attributes: ['id', 'name', 'category_description', 'category_image'], 



//               raw: true // Ensure raw results

//           });

//           // Add the categories for the current country to the result object

//           result[country] = categories.length > 0 ? categories : [];

//       }

//       console.log(result, "Grouped categories by country");

//       // Return the result with categories grouped by country

//       res.status(200).json({ data: result });

//   } catch (error) {

//       // Handle any errors that occur during the process

//       console.error(error); // Log error for debugging

//       res.status(500).json({ error: error.message });

//   }

// };

const getCategoriesByCountries = async (req, res) => {

  const { countries } = req.body; 

  try {

      if (!Array.isArray(countries) || countries.length === 0) {

          return res.status(400).json({ error: 'Countries array is required to perform the search.' });

      }

      const paths = [

          '$.ASIA',

          '$.AFRICA',

          '$.EUROPE',

          '$."NORTH AMERICA"',

          '$."SOUTH AMERICA"',

          '$.OCEANIA',

          '$.ANTARCTICA'

      ];

      const result = {};

      for (const country of countries) { 

          const conditions = paths.map(path => 

              Sequelize.literal(`JSON_CONTAINS(LOWER(JSON_UNQUOTE(JSON_EXTRACT(countries, '${path}'))), LOWER(JSON_QUOTE('${country}')))`));

          const categories = await categoryModel.findAll({

              where: {

                  [Op.or]: conditions,

              },

              attributes: ['id', 'name', 'category_description', 'category_image'], 

              raw: true 

          });

          const formattedCategories = categories.map(category => ({

              category_id: category.id, 

              category_name: category.name, 

              category_description: category.category_description, 

              category_image: category.category_image 

          }));   

          result[country] = formattedCategories.length > 0 ? formattedCategories : [];

      }

      console.log(result, "Grouped categories by country");

      res.status(200).json({ data: result });

  } catch (error) {    

      console.error(error); // Log error for debugging

      res.status(500).json({ error: error.message });
  }
};
  module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    searchCategoriesByName,

    SearchBrandByCategory,

    getAllCategories1,

    searchcategories,

    getCategoriesByCountry,

  uploadExcelSheet,

  getCategoriesByCountries

  };

  