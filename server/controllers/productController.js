const { errorMonitor } = require('form-data');
const db = require('../models/index.js')
const readXlsxFile = require("read-excel-file/node");
const {uploadOnCloudinary,deleteOnCloudinary} = require('../utils/cloudinary.js');
const {getDominantColor} = require('../utils/Background.js');
const fs = require('fs')
const path = require('path')
const Product = db.productModel;
const Brand = db.brandModel;
const Category = db.categoryModel;
const getColors = require('get-image-colors');
const { Op, Sequelize } = require('sequelize');
const { format } = require('date-fns'); 
const { raw } = require('body-parser');
const today = new Date();
const formattedDate = format(today, 'yyyy-MM-dd'); 
const folderName =  `Bycottapp/Products/productLogos/${formattedDate}`;
// Add Product
// exports.addProduct = async (req, res) => {
//   try {
//     const {name}=req.body;
//     if (!name) {
//       return res.status(404).json({ error: 'name is required' });
//     }
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.addProductByUser = async (req, res) => {
  try {
    const { product_name, brand_id, category_id,description } = req.body;
    // Check if the required fields are provided
    if (!product_name) {
      return res.status(404).json({ error: 'name is required' });
    }
    if (!brand_id) {
      return res.status(404).json({ error: 'brand_id is required' });
    }
    if (!category_id) {
      return res.status(404).json({ error: 'category_id is required' });
    }
     // Check if a category with the same name already exists
 const existingProduct = await Product.findOne({ where: { product_name } });
 if (existingProduct) {
   return res.status(409).json({ error: 'product with this name already exists' });
 }
    let logo = null;
    let logo_pid;
    // Check if an image file is present in the request
    if (req.file) {
      // Upload the image to Cloudinary
      const cloudinary_res = await uploadOnCloudinary(req.file.path);
      logo = cloudinary_res.url;
      logo_pid = cloudinary_res.public_id;
      // Delete the local file if uploaded successfully to Cloudinary
      if (cloudinary_res && req.file.path) {
        console.log("req.file.path",req.file.path)
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error('Error deleting file from local system:', err);
          } else {
            console.log('File deleted from local system');
          }
        });
      }
    }
 // Fetch brand details to get the brand logo URL
    // Create the product with the image URL, brand ID, and category ID
    const product = await Product.create({
    ...req.body,
      logo,
      logo_pid
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });at
  }
};
// exports.addProduct = async (req, res) => {
//   try {
//     const { product_name, brand_id, category_id,description,countries,category_name,brand_name } = req.body;
//     // Check if the required fields are provided
//     if (!product_name) {
//       return res.status(404).json({ error: 'name is required' });
//     }
//     if (!brand_id) {
//       return res.status(404).json({ error: 'brand_id is required' });
//     }
//     if (!category_id) {
//       return res.status(404).json({ error: 'category_id is required' });
//     }
//      // Check if a category with the same name already exists
//  const existingProduct = await Product.findOne({ where: { product_name } });
//  if (existingProduct) {
//    return res.status(409).json({ error: 'product with this name already exists' });
//  }
//     let logo = null;
//     let bgColor = null;
//     let logo_pid;
//     // Check if an image file is present in the request
//     if (req.file) {
//       // Upload the image to Cloudinary
//       const cloudinary_res = await uploadOnCloudinary(req.file.path,folderName);
//       logo = cloudinary_res.url;
//       logo_pid = cloudinary_res.public_id;
// const  backgroundColor=await getDominantColor(logo)
// bgColor=backgroundColor.dominantColor

//       // Delete the local file if uploaded successfully to Cloudinary
//       if (cloudinary_res && req.file.path) {
    
//         fs.unlink(req.file.path, (err) => {
//           if (err) {
//             console.error('Error deleting file from local system:', err);
//           } else {
//             console.log('File deleted from local system');
//           }
//         });
//       }
//     }
//     // Parse and validate the 'countries' field if present
//     let parsedCountries = {};
//     if (countries) {
//       try {
//         parsedCountries = JSON.parse(countries);

//         console.log(typeof parsedCountries,"parsed")
//       } catch (error) {
//         return res.status(400).json({ error: 'Invalid countries format. It should be a valid JSON.' });
//       }
//     }
//     const brand = await Brand.findByPk(brand_id);
//     if (!brand) {
//       return res.status(404).json({ error: 'Brand not found' });
//     }
//     const brand_logo = brand.brand_image;
//     const category = await Category.findByPk(category_id);
//     if (!category) {
//       return res.status(404).json({ error: 'category not found' });
//     }
//     console.log(countries,"countries")
  
//   const productCategory=category.name
//     // Create the product with the image URL, brand ID, and category ID
//     const product = await Product.create({
//     ...req.body,
//       logo,
//       logo_pid,
//       brand_logo,
//       brand_name,
//       category_name,
//       countries,
//       category:productCategory,
//       bgColor
//     });
//     res.status(201).json({product});
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
// exports.getAllProducts = async (req, res) => {
//   const { page = 1, limit = 1000 } = req.query;
//   try {
//     const offset = (page - 1) * limit;
//     const products = await Product.findAndCountAll({
//       limit: parseInt(limit),
//       offset: parseInt(offset),
//       order: [
//         ['id', 'DESC'],
//     ],
//     });
//     console.log(products,"products count")
//     res.status(200).json({
//       totalItems: products.count,
//       totalPages: Math.ceil(products.count / limit),
//       currentPage: parseInt(page),
//       result: products.rows
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
exports.addProduct = async (req, res) => {
  try {
    const { product_name, brand_id, category_id, description, countries, category_name, brand_name } = req.body;
    // Check required fields
    if (!product_name) return res.status(404).json({ error: 'Product name is required' });
    if (!brand_id) return res.status(404).json({ error: 'Brand ID is required' });
    if (!category_id) return res.status(404).json({ error: 'Category ID is required' });
    // Check if product name is unique
    const existingProduct = await Product.findOne({ where: { product_name } });
    if (existingProduct) return res.status(409).json({ error: 'Product with this name already exists' });

    // Upload logo to Cloudinary
    let logo = null;
    let logo_pid = null;
    let bgColor = null;

    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path, 'logo_folder');
      logo = cloudinaryRes.url;
      logo_pid = cloudinaryRes.public_id;

      // Get dominant background color
      const backgroundColor = await getDominantColor(logo);
      bgColor = backgroundColor.dominantColor;

      // Delete local file after uploading to Cloudinary
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting logo file from local system:', err);
      });
    }

    // Upload variants images to Cloudinary
    let variantLinks = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const cloudinaryRes = await uploadOnCloudinary(file.path, 'variants_folder');
        variantLinks.push(cloudinaryRes.url);

        // Delete local variant file after uploading to Cloudinary
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting variant file from local system:', err);
        });
      }
    }

    // Parse and validate countries field
    let parsedCountries = [];
    if (countries) {
      try {
        parsedCountries = JSON.parse(countries);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid countries format. It should be a valid JSON array.' });
      }
    }
    // Fetch brand and category names from database
    const brand = await Brand.findByPk(brand_id);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    const brand_logo = brand.brand_image;

    const category = await Category.findByPk(category_id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    const productCategory = category.name;

    // Create product entry in the database
    const product = await Product.create({
      ...req.body,
      logo,
      logo_pid,
      brand_logo,
      brand_name,
      category_name,
      countries: parsedCountries,
      category: productCategory,
      bgColor,
      variant: variantLinks // Save variant URLs
    });

    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  const { page = 1, limit = 1000 } = req.query;
  try {
    const offset = (page - 1) * limit;
    const products = await Product.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']],
    });
    // Logging product data for debugging
    // products.rows.forEach((product, index) => {
    //   console.log(`Product ${index + 1}:`, product.dataValues);
    // });
    const productData = products.rows.map(product => product.dataValues);
    console.log(`${productData}`);

    const formattedProducts = productData.map(product => {
      if (typeof product.countries === 'string') {
        product.countries = JSON.parse(product.countries);
      }
      if (typeof product.variant === 'string') {
        product.variant = JSON.parse(product.variant);
      }
      return product;
    });
    // Sending response
    res.status(200).json({
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      result: productData
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getAllProductsImported = async (req, res) => {
  const { page = 1, limit = 1000 } = req.query;
  try {
    const offset = (page - 1) * limit;
    const products = await Product.findAndCountAll({
      where: {
        imported: true  // Filter products where imported is true
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [
        ['id', 'DESC'],
    ],
    });
    res.status(200).json({
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      result: products.rows
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get All Products By status with pagination
exports.getProductsByStatus = async (req, res) => {
  const { status } = req.query;
  const { page = 1, limit = 10 } = req.query;
  try {
    const offset = (page - 1) * limit;
    const products = await Product.findAndCountAll({
      where: { status },
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    res.status(200).json({
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      result: products.rowsgetproductbyid
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// exports.getProductsById = async (req, res) => {
//     const { id } = req.query;
//     if(!id){
//         return(
//             res.status(400).json({
//                 message : "Id is required",
//                 status : false
//             })
//         )
//     }
//     try {
//       console.log("id",id)
//       const product= await Product.findOne({
//         where: { id },raw:true
//       });
 
//       if(product){
//      console.log("product",product)
//       //  const searchCount =await Product.increment('searchCount');
//         res.status(200).json({
//             message : "product fetched",
//             status : true,
//             result : product
//           });
//       }
//       else{
//         res.status(400).json({
//             message : "Product could not be fetched",
//             status : false
//           });
//       }
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
exports.getProductsById = async (req, res) => {
  const { id } = req.query;

  if (!id) {
      return res.status(400).json({
          message: "Id is required",
          status: false,
      });
  }

  try {
   
      
      // Fetch the product by its ID
      const product = await Product.findOne({
          where: { id },
          raw: true
      });
      if (product) {
          console.log("product", product);
          const relatedProducts = await Product.findAll({
              where: { brand_id: product.brand_id },  
              attributes: ['product_name', 'logo'],  
              raw: true
          });
          const relatedProductLogos = relatedProducts.map(p => ({
              product_name: p.product_name,
              logo: p.logo
          }));
          // Return the product along with related product logos
          res.status(200).json({
              message: "Product fetched successfully",
              status: true,
              result: {
                  ...product,
                  relatedProducts: relatedProductLogos  // Include the related products with logos
              }
          });
      } else {
          res.status(400).json({
              message: "Product could not be fetched",
              status: false
          });
      }
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


exports.getProductsByBrand = async (req, res) => {
    const { brand_id } = req.query;
    if (!brand_id) {
        return res.status(400).json({
            message: "Brand ID is required",
            status: false
        });
    }

    try {
        const products = await Product.findAll({
            where: { brand_id },
            raw: true
        });
console.log(products,"products")
        if (products.length > 0) {
            res.status(200).json({
                message: "Products fetched successfully",
                status: true,
                result: products
            });
        } else {
            res.status(404).json({
                message: "No products found for the specified brand",
                status: false
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            status: false
        });
    }
};
// exports.getProductsByBrandAndCategory = async (req, res) => {
//   const { brand_id, category_id } = req.query;
//   if (!brand_id || !category_id) {
//     return res.status(400).json({
//         message: "Both Brand ID and Category ID are required",
//         status: false
//     });
// }
//   try {
//       const products = await Product.findAll({
//         where: {
//           brand_id,
//           category_id
//       },
//       raw: true
//       });
//       console.log(products,"products")
//       if (products.length > 0) {
//           res.status(200).json({
//               message: "Products fetched successfully",
//               status: true,
//               result: products
//           });
//       } else {
//           res.status(404).json({
//               message: "No products found for the specified brand",
//               status: false
//           });
//       }
//   } catch (error) {
//       res.status(500).json({
//           error: error.message,
//           status: false
//       });
//   }
// };
// Get All Products By Position with Pagination
exports.getProductsByBrandAndCategories = async (req, res) => {
  const { brand_id, category_id } = req.query;
  if (!brand_id) {
    return res.status(400).json({
      message: "Brand ID is required",
      status: false
    });
  }
  const whereClause = { brand_id };
  if (category_id) {
    const categories = typeof category_id === 'string' ? category_id.split(',') : category_id;
    whereClause.category_id = {
      [Op.in]: categories 
    };
  }
console.log(whereClause)
  try {
    const products = await Product.findAll({
      where: whereClause,
      raw: true
    });

    if (products.length > 0) {
      res.status(200).json({
        message: "Products fetched successfully",
        status: true,
        result: products
      });
    } else {
      res.status(404).json({
        message: "No products found for the specified brand",
        status: false
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: false
    });
  }
};
exports.getProductsByPosition = async (req, res) => {
  const { position } = req.query;
  const { page = 1, limit = 10 } = req.query;
  try {
    const offset = (page - 1) * limit;
    const products = await Product.findAndCountAll({
      where: { position },
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    res.status(200).json({
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      result: products.rows
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Edit Product
// exports.editProduct = async (req, res) => {
//   const { id } = req.query;
//   try {
//     const [updated] = await Product.update(req.body, {
//       where: { id }
//     });
//     if (updated) {
//       const updatedProduct = await Product.findOne({ where: { id } });
//       res.status(200).json(updatedProduct);
//     } else {
//       throw new Error('Product not found');
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
// exports.editProduct = async (req, res) => {
//   const { id } = req.query;
// console.log(req.body,"req.body")

//   let logo = null;
//   let logo_pid = null;

//   try {
//     // Fetch the current product
//     const product = await Product.findOne({ where: { id } });
//     if (!product) {
//       throw new Error('Product not found');
//     }

//     // Check if a new logo is provided
//     if (req.file) {
//       // Upload the new logo to Cloudinary
//       const cloudinaryRes = await uploadOnCloudinary(req.file.path);
     
//       logo = cloudinaryRes.url;
//       logo_pid = cloudinaryRes.public_id;
// console.log(logo,"logo uploaded")
//       // Delete the old logo from Cloudinary
//       if (product.logo_pid) {
//      const preDel=  await deleteOnCloudinary(product.logo_pid);
//      if(preDel){
//       console.log("deleted old logo from Cloudinary")
//      }
//       }
      
//       // Delete the local file
//       if (req.file.path) {
//         fs.unlink(req.file.path, (err) => {
//           if (err) {
//             console.error('Error deleting file from local system:', err);
//           } else {
//             console.log('File deleted from local system');
//           }
//         });
//       }
//     } else {
//       // Use existing logo if no new logo is provided
//       logo = product.logo;
//       logo_pid = product.logo_pid;
//     }
 
//     if (updateData.product_name !== undefined) {
//       updateFields.product_name = updateData.product_name;
//     }
    
//     // Conditionally add `logo` to `updateFields` if it has a valid value
//     if (updateData.logo) {
//       updateFields.logo = updateData.logo;
//     }
    
//     console.log(updateFields, "updateFields"); // Log the final object to see what will be updated
    
//     console.log(updateData,"updateData")
//     // const jsonupdatedata= JSON.stringify(updateData, null, 2);
//  // console.log(jsonupdatedata,"jsonupdatedata")
//     // Update the product with the new data
//     const [updated] = await Product.update(
//       updateData,
//       {
//         where: { id },
//         returning: true, // Ensure that the updated object is returned
//       }
//     );

//     if (updated) {
//       const updatedProduct = await Product.findOne({ where: { id } });
//       res.status(200).json(updatedProduct);
//     } else {
//       throw new Error('Product not found');
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
// exports.editProduct = async (req, res) => {
//   const { id } = req.query;
//   console.log(req.body, "req.body");
//   let logo = null;
//   let logo_pid = null;
//   const updateData = { ...req.body }; // Clone req.body to start building updateData

//   try {
//     // Fetch the current product
//     const product = await Product.findOne({ where: { id } });
//     if (!product) {
//       throw new Error('Product not found');
//     }

//     // Check if a new logo is provided
//     if (req.file) {
//       // Upload the new logo to Cloudinary
//       const cloudinaryRes = await uploadOnCloudinary(req.file.path);

//       logo = cloudinaryRes.url;
//       logo_pid = cloudinaryRes.public_id;
//       console.log(logo, "logo uploaded");

//       // Delete the old logo from Cloudinary, if it exists
//       if (product.logo_pid) {
//         const preDel = await deleteOnCloudinary(product.logo_pid);
//         if (preDel) {
//           console.log("Deleted old logo from Cloudinary");
//         }
//       }
//       // Delete the local file after uploading
//       fs.unlink(req.file.path, (err) => {
//         if (err) {
//           console.error('Error deleting file from local system:', err);
//         } else {
//           console.log('File deleted from local system');
//         }
//       });
//     } else {
//       // If no new logo is provided, use existing values
//       logo = product.logo;
//       logo_pid = product.logo_pid;
//     }
//     // Conditionally add fields to updateData
//     if (logo) {
//       updateData.logo = logo;
//       updateData.logo_pid = logo_pid;
//     }

//     if (req.body.product_name !== undefined) {
//       updateData.product_name = req.body.product_name;
//     }

//     console.log(updateData, "Final updateData before updating");

//     // Update the product with the new data
//     const updated = await Product.update({
//       logo:updateData.logo,
//       product_name:updateData.product_name
//     }, {
//       where: { id },

//     });
// console.log(updated,"..........................");
//     if (updated) {
//       const updatedProduct = await Product.findOne({ where: { id } });
//       res.status(200).json(updatedProduct);
//     } else {
//       throw new Error('Product not updated');
//     }
//   } catch (error) {
//     console.error("Error in editProduct:", error);
//     res.status(400).json({ error: error.message });
//   }
// };
exports.editProduct = async (req, res) => {
  const { id } = req.query;
  console.log(req.body, "req.body");

  let logo = null;
  let logo_pid = null;
  const updateData = { ...req.body };

  try {
    // Fetch the current product
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }

    // Process new logo if provided
    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path);

      if (cloudinaryRes && cloudinaryRes.url && cloudinaryRes.public_id) {
        logo = cloudinaryRes.url;
        logo_pid = cloudinaryRes.public_id;
      } else {
        throw new Error("Failed to upload to Cloudinary");
      }

      if (product.logo_pid) {
        await deleteOnCloudinary(product.logo_pid);
      }

      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file from local system:", err);
      });
    } else {
      logo = product.logo;
      logo_pid = product.logo_pid;
    }

    // Update product instance fields with new data
    if (logo) {
      product.logo = logo;
      product.logo_pid = logo_pid;
    }
    
    if (updateData.product_name) {
      product.product_name = updateData.product_name;
    }

    // Parse and update variant if it's a JSON string
    if (typeof updateData.variant === 'string') {
      try {
        product.variant = JSON.parse(updateData.variant);
      } catch (error) {
        console.error("Invalid JSON for variant:", error);
        return res.status(400).json({ error: "Invalid JSON format for variant" });
      }
    } else if (updateData.variant) {
    // Parse and update variant if it's a JSON string
if (typeof updateData.variant === 'string') {
  try {
    product.variant = JSON.parse(updateData.variant); // Parse string JSON to array or object
  } catch (error) {
    console.error("Invalid JSON format for 'variant':", error);
    return res.status(400).json({ error: "Invalid JSON format for 'variant'" });
  }
} else if (updateData.variant) {
  console.log(updateData.variant, " directly updateData.variant");
  product.variant = updateData.variant; // Directly assign if it's already an array or object
}
    }

    // Save changes to the database
    await product.save();

    console.log("Product updated successfully:", product.dataValues);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error in editProduct:", error);
    res.status(400).json({ error: error.message });
  }
};
exports.updateProductImages = async (req, res) => {
  const { id } = req.query;

  try {
    // Fetch the current product
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if a new logo or product_image is provided
    const { logo, product_image } = req.files;

    if (logo || product_image) {
      if (logo && logo[0]) {
        // Upload the new logo to Cloudinary
        const cloudinaryRes = await uploadOnCloudinary(logo[0].path);
        const newLogo = cloudinaryRes.url;
        const newLogoPid = cloudinaryRes.public_id;
        console.log(newLogo, "New logo uploaded");

        // Delete the old logo from Cloudinary, if it exists
        if (product.logo_pid) {
          const preDel = await deleteOnCloudinary(product.logo_pid);
          if (preDel) {
            console.log("Deleted old logo from Cloudinary");
          }
        }

        // Delete the local logo file after uploading
        fs.unlink(logo[0].path, (err) => {
          if (err) {
            console.error('Error deleting logo file from local system:', err);
          } else {
            console.log('Logo file deleted from local system');
          }
        });

        // Update the product's logo fields
        product.logo = newLogo;
        product.logo_pid = newLogoPid;
      }

      if (product_image && product_image[0]) {
        // Upload the new product image to Cloudinary
        const cloudinaryRes = await uploadOnCloudinary(product_image[0].path);
        const newImage = cloudinaryRes.url;
        const newImagePid = cloudinaryRes.public_id;
        console.log(newImage, "New product image uploaded");

        // Delete the old product image from Cloudinary, if it exists
        if (product.product_image_pid) {
          const preDel = await deleteOnCloudinary(product.product_image_pid);
          if (preDel) {
            console.log("Deleted old product image from Cloudinary");
          }
        }

        // Delete the local product image file after uploading
        fs.unlink(product_image[0].path, (err) => {
          if (err) {
            console.error('Error deleting product image file from local system:', err);
          } else {
            console.log('Product image file deleted from local system');
          }
        });

        // Update the product's product_image fields
        product.product_image = newImage;
       
      }

      // Save the updated product
      const saved = await product.save();

      return res.status(200).json(product);
    } else {
      return res.status(400).json({ error: 'No file provided for update.' });
    }
  } catch (error) {
    console.error("Error in updateProductImages:", error);
    return res.status(400).json({ error: error.message });
  }
};


exports.updateProductStatuses = async (req, res) => {
  const { ids, status } = req.body;
  // Check if ids and status are present
  if (!ids || !Array.isArray(ids) || !status) {
    return res.status(400).json({ error: 'Invalid request data. Ensure both ids and status are provided.' });
  }
  try {
   // Update the status of all products with the specified IDs
    const [updated] = await Product.update({ status:status },{
      where: { id: ids },
    } );
    //const products = await Product.findAll({ where: { id: ids } , raw: true});
console.log(updated, "updated with hardcoded values");
    if (updated) {
      res.status(200).json({ message: `${updated} products updated successfully.` });
    } else {
      throw new Error('No products found with the provided IDs');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Delete Product
exports.deleteProduct = async (req, res) => {
  const { id } = req.query;
  try {
    const deleted = await Product.destroy({
      where: { id }
    });
    console.log(deleted)
    if (deleted == 1) {
      res.json({
        message : "Deleted Successfully",
        status : true
      });
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// exports.getAllPCountryroductsBy = async (req, res) => {
//   const { country } = req.query; 

//   try {
//     // Step 1
//     const brands = await Brand.findAll({
//       where: { country_name:country }, 

//       raw: true
//     });
// console.log(brands)

//     if (brands.length === 0) {
//       return res.status(404).json({ message: 'No brands found for the specified country' });
//     }
//     // Step 2: Extract the IDs of the brands
//     const brandIds = brands.map(brand => brand.id);

//     // Step 3: Fetch all products associated with these brand IDs
//     const products = await Product.findAll({
//       where: {
//         brand_id: brandIds, // Assuming your Product model has a `brand_id` field
//       },
//     });

//     if (products.length === 0) {
//       return res.status(404).json({ message: 'No products found for the specified country' });
//     }
//     // Return the products found
//     res.status(200).json({products,"Total Products of This Country":products.length});
//   } catch (error) {
//     // Handle any errors that occur during the process
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAllProductsByCountry = async (req, res) => {
//   const { country } = req.query; 

//   try {
//     // Check if the country is provided in the query
//     if (!country) {
//       return res.status(400).json({ error: 'Country is required to perform the search.' });
//     }
// console.log(country,"country from query")
//     // Step 1: Fetch all products where the given country is present in the `countries` JSON field
//     const products = await Product.findAll({
//       where: {
//         [Op.or]: [
//           Sequelize.literal(`JSON_CONTAINS(countries->'$.asia', '"${country}"')`),
//           Sequelize.literal(`JSON_CONTAINS(countries->'$.africa', '"${country}"')`),
//           Sequelize.literal(`JSON_CONTAINS(countries->'$.europe', '"${country}"')`),
//           Sequelize.literal(`JSON_CONTAINS(countries->'$.north_america', '"${country}"')`),
//           Sequelize.literal(`JSON_CONTAINS(countries->'$.south_america', '"${country}"')`),
//           Sequelize.literal(`JSON_CONTAINS(countries->'$.australia_oceania', '"${country}"')`),
//           Sequelize.literal(`JSON_CONTAINS(countries->'$.antarctica', '"${country}"')`)
//         ]
//       }
//     });
//     // Step 2: If no products are found, return a 404 error
//     if (products.length === 0) {
//       return res.status(404).json({ message: 'No products found for the specified country' });
//     }

//     // Return the products found along with the total count
//     res.status(200).json({ products, "Total Products of This Country": products.length });
//   } catch (error) {
//     // Handle any errors that occur during the process
//     res.status(500).json({ error: error.message });
//   }
// };
// exports.getAllProductsByCountry = async (req, res) => {
//   const { country } = req.query;
//   try {
//     // Check if the country is provided in the query
//     if (!country) {
//       return res.status(400).json({ error: 'Country is required to perform the search.' });
//     }

//     console.log(country, "country from query");

//     // Formulating query conditions for each continent key
//     const paths = [
//       '$.ASIA',
//       '$.AFRICA',
//       '$.EUROPE',
//       '$."NORTH AMERICA"',
//       '$."SOUTH AMERICA"',
//       '$.OCEANIA',
//       '$.ANTARCTICA'
//     ];
    

//     // Prepare an array of JSON_CONTAINS conditions
//     const conditions = paths.map(path => 
//       Sequelize.literal(`JSON_CONTAINS(countries, JSON_QUOTE('${country}'), '${path}')`)
//     );
//     // Execute the findAll query with conditions
//     const products = await Product.findAll({
//       where: {
//         [Op.or]: conditions,
//       },raw:true
//     });
//     // Step 2: If no products are found, return a 404 error
//     if (products.length === 0) {
//       return res.status(404).json({ message: 'No products found for the specified country' });
//     }
// console.log("Products",products,"products")
//     // Return the products found along with the total count
//     res.status(200).json({ products, "Total Products of This Country": products.length });
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error(error); // Log error for debugging
//     res.status(500).json({ error: error.message });
//   }
// };
exports.getAllProductsByCountry = async (req, res) => {
  const { country, page = 1, limit = 10 } = req.query; 

  try {
   
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
    ];

    // Prepare an array of JSON_CONTAINS conditions
    const conditions = paths.map(path => 
      Sequelize.literal(`JSON_CONTAINS(countries, JSON_QUOTE('${country}'), '${path}')`)
    );

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Execute the findAndCountAll query with conditions and pagination
    const { count, rows: products } = await Product.findAndCountAll({
      where: {
        [Op.or]: conditions,
      },
      limit: parseInt(limit), // Limit number of products per page
      offset: parseInt(offset), // Offset for pagination
      raw: true // Return raw data
    });

    // If no products are found, return a 404 error
    if (count === 0) {
      return res.status(404).json({ message: 'No products found for the specified country' });
    }

    console.log("Products", products, "products");

    // Return the products along with pagination details
    res.status(200).json({
      totalItems: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page),
      result: products
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
};
exports.getAllProductsByRegion = async (req, res) => {
  const { country, continent } = req.query;

  try {
    // Check if at least one of country or continent is provided
    if (!country && !continent) {
      return res.status(400).json({ error: 'Please provide either a country or a continent to perform the search.' });
    }

    // List of valid continents
    const validContinents = [
      'Asia',
      'Africa',
      'Europe',
      'North America',
      'South America',
      'Oceania',
      'Antarctica'
    ];

    let conditions = [];

    // If the user is searching by country
    if (country) {
      console.log(country, "country from query");

      // Continent paths for searching countries within continents
      const paths = [
        '$.Asia',
        '$.Africa',
        '$.Europe',
        '$."North America"',
        '$."South America"',
        '$.Oceania',
        '$.Antarctica'
      ];

      // Create conditions for searching the country in each continent
      conditions = paths.map(path =>
        Sequelize.literal(`JSON_CONTAINS(countries, JSON_QUOTE('${country}'), '${path}')`)
      );
    }

    // If the user is searching by continent
    if (continent) {
      console.log(continent, "continent from query");

      // Validate the provided continent
      if (!validContinents.includes(continent)) {
        return res.status(400).json({ error: 'Invalid continent specified.' });
      }
      // Add condition to check for the continent as a key in the JSON object
      conditions.push(
        Sequelize.literal(
          `JSON_CONTAINS_PATH(countries, 'one', '$."${continent}"') AND JSON_LENGTH(countries->'$."${continent}"') > 0`
        )
      ); }
      console.log("Constructed conditions:", conditions);
    // Execute the findAll query with the combined conditions
    const products = await Product.findAll({
      where: {
        [Op.or]: conditions,
      },
      raw: true
    });

    // If no products are found, return a 404 error
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for the specified country or continent.' });
    }


    // Return the products found along with the total count
    res.status(200).json({ products, "Total Products Found": products.length });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
};
exports.getAllCountriesByProduct = async (req, res) => {
  const { product_name } = req.query;
  console.log(product_name, "product_name")
  try {
    // Step 1: Check if the product name is provided in the query
    if (!product_name) {
      return res.status(400).json({ error: 'Product name is required to perform the search.' });
    }
    // Step 2: Fetch the product based on the product name
    const product = await Product.findOne({
      where: { product_name },
      attributes: ['countries'], // Only fetch the countries field
      raw:true
    });
    // Step 3: If the product is not found, return a 404 error
    if (!product) {
      return res.status(404).json({ message: 'No product found with the specified name.' });
    }
    // Step 4: Extract the countries from the JSON field
    const countries = product.countries;
    // Check if the countries field exists and has values
    if (!countries || Object.keys(countries).length === 0) {
      return res.status(404).json({ message: 'No countries found for the specified product.' });
    }
    // Step 5: Get all unique countries from all the regions
    const allCountries = [];
    const allContinent = [];
    Object.entries(countries).forEach(([continent, region]) => {
      if (region.length > 0) {
        allCountries.push(...region); // Spread the countries from each region into the array
        allContinent.push(continent); // Add the continent if it has non-empty regions
      }
    });
    // Step 6: Remove duplicate countries (if any)
    const uniqueCountries = [...new Set(allCountries)];
    // Return the list of countries along with the total count
    res.status(200).json({  countries: uniqueCountries, 
      "Total Countries": uniqueCountries.length, 
      continents: allContinent ,
      "Total continents": allContinent.length, });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: error.message });
  }
};
// exports.uploadExcelSheet = async (req, res) => {
//   try {
//     if (req.file === undefined) {
//       return res.status(400).send("Please upload an excel file!");
//     }

//     console.log(req.file);

//     const filePath = req.file.path;
//     // Read the Excel file
//     const rows = await readXlsxFile(filePath);
//     const products = rows.slice(1).map(row => ({
//       brand_name: row[0],
//       product_name: row[1],
//       category: row[2],
//       reason: row[3],
//       status: row[4],
//       position: row[5],
//       description: row[6],
//       reference: row[7],
//       logo: row[8],
//       imported: row[9],
//       category_id: row[10],
//       brand_id: row[11]
//     }));
//     console.log("Products are", products);
//     // Delete the file after processing
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//       console.log(`File ${filePath} is deleted!`);
//     } else {
//       console.log(`File ${filePath} does not exist.`);
//     }
//     let result = await Product.bulkCreate(products);
//     if(result){
//       res.status(200).send({
//         message: "File uploaded and processed successfully.",
//         products
//       });
//     }
//     else{
//       res.status(400).json({
//         message : "Could not import",
//         status : false
//       })
//     }
//   } catch (error) {
//     console.log(error.message);
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
// Fetch popular products based on search count
exports.getPopularProducts = async (req, res) => {
  try {
    const popularProducts = await Product.findAll({
      order: [['searchCount', 'DESC']],
      limit: 3, 
    });
    res.status(200).json({
      message: 'Popular products fetched successfully',
      status: true,
      result: popularProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while fetching popular products',
      status: false,
      error: error.message,
    });
  }
};
exports.deleteProducts = async (req, res) => {
  const { ids } = req.body;
  try {
    // Delete all products with the specified IDs
    const deletedCount = await Product.destroy({
      where: {
        id: ids
      }
    });
    if (deletedCount > 0) {
      res.status(200).json({ message: `${deletedCount} products deleted successfully.` });
    } else {
      throw new Error('No products found with the provided IDs');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// exports.uploadExcelSheet = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send("Please upload an excel file!");
//     }
//     console.log(req.file);
//     const filePath = req.file.path;
//     // Read the Excel file
//     const rows = await readXlsxFile(filePath);
//     const products = rows.slice(1).map(row => ({
//       product_name: row[0],        
//       brand_name: row[1],         
//       countries: JSON.parse(row[2]), // Ensure this is parsed as a JSON object
//       category_name: row[3],
//       reason: row[4],
//       status: row[5],
//       position: row[6],
//       description: row[7],
//       reference: row[8],
//       imported: row[9], 
//       logo: row[10]
//     }));
//     console.log("Processed Products:", products);

//     // Delete the file after processing
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//       console.log(`File ${filePath} is deleted!`);
//     } else {
//       console.log(`File ${filePath} does not exist.`);
//     }

//     // Bulk create products in the database
//     let result = await Product.bulkCreate(products);
//     if (result) {
//       res.status(200).send({
//         message: "File uploaded and processed successfully.",
//         products
//       });
//     } else {
//       res.status(400).json({
//         message: "Could not import products.",
//         status: false
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
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
exports.uploadExcelSheet = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Please upload an excel file!");
    }
    const filePath = req.file.path;
    // Read the Excel file
    const rows = await readXlsxFile(filePath);
    const brandNames = new Set(rows.slice(1).map(row => row[1])); 
    const categoryNames = new Set(rows.slice(1).map(row => row[3]));
    // Fetch brand IDs based on the brand names
    const brands = await Brand.findAll({
      attributes: ['id', 'name'],
      where: {
        name: {
          [Op.in]: Array.from(brandNames),
        },
      },
    });
    const brandMap = brands.reduce((map, brand) => {
      map[brand.name] = brand.id;
      return map;
    }, {});
    // Fetch category IDs based on the category names
    const categories = await Category.findAll({
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
    const products = rows.slice(1).map(row => {
      const brandName = row[1];
      const categoryName = row[3];
      console.log(row[8],"...............row[8]")
      return {
        product_name: row[0],
        brand_name: brandName,
        brand_id: brandMap[brandName] || null, 
        category_name: categoryName,
        category_id: categoryMap[categoryName] || null, 
        countries: JSON.parse(row[2]), 
        reason: row[4],
        status: row[5],
        position: row[6],
        description: row[7],
        logo: row[8],
        imported: row[9],
        bgColor: row[10],
      };
    });
    // Delete the file after processing
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File ${filePath} is deleted!`);
    } else {
    console.log(`File ${filePath} does not exist.`);
    }
    // Bulk create products in the database
    const result = await Product.bulkCreate(products);
    if (result) {
      res.status(200).send({
        message: "File Uploaded and Processed Successfully.",
        products,
      });
    } else {
      res.status(400).json({
        message: "Could not import Products.",
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
exports.updateProductCategory = async (req, res) => {
  const { id, category_name } = req.body;
  try {
    const [updated] = await Product.update(
      { category_name },  
      {
        where: { id }
      }
    );
    if (updated) {
      res.status(200).json({ message: `${updated} products updated successfully.` });
    } else {
      throw new Error('No products found with the provided IDs');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.search = async (req, res) => {
  try {
    const { Search } = req.query; // Get the search query from the request
    if (!Search) {
      return res.status(400).json({
        message: 'Search query is required',
        status: false,
      });
    }
    const matchingProducts = await Product.findAll({
      where: {
        [Op.or]: [
          { product_name: { [Op.like]: `%${Search}%` } }, 
          { description: { [Op.like]: `%${Search}%` } }, 
          { brand_name: { [Op.like]: `%${Search}%` } }, 
          { category_name: { [Op.like]: `%${Search}%` } }, 
        ],
      }, raw: true
    });
    const matchingBrands = await Brand.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${Search}%` } }, 
          { brand_description: { [Op.like]: `%${Search}%` } }, 
          { category_name: { [Op.like]: `%${Search}%` } },
        ],
      }, raw: true
    });
    const matchingCategories = await Category.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${Search}%` } }, 
          { category_description: { [Op.like]: `%${Search}%` } }, 
        ],
      }, raw: true
    });
      // Extract dataValues from each product instance
    //  const productsData = matchingProducts.map((product) => product.dataValues);
    res.status(200).json({
      message: 'Matching products fetched successfully',
      status: true,
      Products: matchingProducts ? matchingProducts: [],
      Brands: matchingBrands ? matchingBrands: [],
      Categories: matchingCategories ? matchingCategories: [],
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while searching for products',
      status: false,
      error: error.message,
    });
  }
};
exports.getProductsByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    if (!category) {
      return res.status(400).json({ error: 'Category is required to perform the search.' });
    }

    const products = await Product.findAll({
      where: {
        category_id: category 
      },raw:true
    });
    console.log(products,"object")
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for the specified category' });
    }

    // Return the products found along with the total count
    res.status(200).json({ products, "Total Products in This Category": products.length });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: error.message });
  }
};
exports.getBackgroundColor = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }
    const colors = await getColors(imageUrl);
    if (colors.length === 0) {
      return res.status(404).json({ error: 'No colors found in the image' });
    }
    colors.sort((a, b) => b.percent - a.percent);
    let responseColors = colors.map(color => ({
      hex: color.hex(),
      percentage: color.percent,
    }));
    let gradientBackground = '';
    if (colors.length >= 2) {
      // Create a gradient from the top two colors
      const topTwoColors = colors.slice(0, 2).map(color => color.hex());
      gradientBackground = `linear-gradient(45deg, ${topTwoColors.join(', ')})`;
    }
    // Prepare the response
    const response = {
      dominantColor: colors[0].hex(),
      dominantColorPercentage: colors[0].percent,
      colors: responseColors, 
      background: gradientBackground, 
    };
    return res.json(response);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to process the image' });
  }
};
// exports.searchProducts =async (req, res) => {
//   try {
//     const { Search } = req.query; // Get the search query from the request
//     if (!Search) {
//       return res.status(400).json({
//         message: 'Search query is required',
//         status: false,
//       });
//     }
 
//     const matchingProducts = await Product.findAll({
//       where: {
//         [Op.or]: [
//           { product_name: { [Op.like]: `%${Search}%` } }, 
//           { description: { [Op.like]: `%${Search}%` } }, 
//           { brand_name: { [Op.like]: `%${Search}%` } }, 
//           { category_name: { [Op.like]: `%${Search}%` } }, 
//         ],
//       }, raw: true
//     });
//     res.status(200).json({
//       message: 'Matching products fetched successfully',
//       status: true,
//       Products: matchingProducts ? matchingProducts: [],
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'An error occurred while searching for Brands',
//       status: false,
//       error: error.message,
//     });
//   }
// };
exports.searchProducts = async (req, res) => {
  try {
    const { Search, country } = req.query; // Get the search query and country from the request

    if (!Search) {
      return res.status(400).json({
        message: 'Search query is required',
        status: false,
      });
    }

    if (!country) {
      return res.status(400).json({
        message: 'Country is required to filter products',
        status: false,
      });
    }

    // Define paths for country filtering
    const paths = [
      '$.ASIA',
      '$.AFRICA',
      '$.EUROPE',
      '$."NORTH AMERICA"',
      '$."SOUTH AMERICA"',
      '$.OCEANIA',
      '$.ANTARCTICA'
    ];

    // Create conditions to filter products by country
    const countryConditions = paths.map(path => 
      Sequelize.literal(`JSON_CONTAINS(countries, JSON_QUOTE('${country}'), '${path}')`)
    );

    // Find products matching both the search query and country condition
    const matchingProducts = await Product.findAll({
      where: {
        [Op.and]: [
          { [Op.or]: countryConditions }, // Country filter
          { [Op.or]: [ // Search conditions
            { product_name: { [Op.like]: `%${Search}%` } }, 
            { description: { [Op.like]: `%${Search}%` } }, 

            
          ]},
        ]
      },
      raw: true
    });

    // If no matching products, return an empty result
    if (matchingProducts.length === 0) {
      return res.status(200).json({
        message: 'No matching products found for the specified search and country',
        status: true,
        Products: [],
      });
    }

    // Return matching products
    res.status(200).json({
      message: 'Matching products fetched successfully',
      status: true,
      Products: matchingProducts,
    });

  } catch (error) {
    // Handle any errors during the process
    res.status(500).json({
      message: 'An error occurred while searching for products',
      status: false,
      error: error.message,
    });
  }
};
exports.updateProductDetails = async (req, res) => {
  const { id } = req.query; // Extract the single product id from query parameters

  if (!id) {
    return res.status(400).json({ error: 'Product ID is required.' });
  }

  try {
    // Find the product by ID
    const product = await Product.findOne({
      where: { id },
    });
    if (!product) {
      return res.status(404).json({ message: `Product with id ${id} not found.` });
    }
    // Update only the provided fields
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key];
      }
    });
    const updated = await product.save();
    if (updated) {
      res.status(200).json({ message: `Product with id ${id} updated successfully.` });
    } else {
      res.status(400).json({ message: `Failed to update product with id ${id}.` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.updateProductDetails = async (req, res) => {
//   const { id } = req.query; // Extract the single product id from query parameters
//   const { brand_name, brand_id, category_name, category_id } = req.body; // Extract fields to update from request body
//   console.log(brand_name, brand_id, category_name, category_id);
//   if (!id) {
//     return res.status(400).json({ error: 'Product ID is required.' });
//   }
//   try {
//     // Find the product by ID
//     const product = await Product.findOne({
//       where: { id }, // Use the single id passed via query
//     });
//     if (!product) {
//       return res.status(404).json({ message: `Product with id ${id} not found.` });
//     }
//     // Update the product with the new values or fallback to existing ones
//     product.brand_name = brand_name || product.brand_name;
//     product.brand_id = brand_id || product.brand_id;
//     product.category_name = category_name || product.category_name;
//     product.category_id = category_id || product.category_id;
//     const updated = await product.save();
//     if (updated) {
//       res.status(200).json({ message: `Product with id ${id} updated successfully.` });
//     } else {
//       res.status(400).json({ message: `Failed to update product with id ${id}.` });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.getAllProductsGroupedByCategory = async (req, res) => {
  const { page = 1, limit = 1000 } = req.query;
  try {
    const offset = (page - 1) * limit;
    const categories = await Product.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('category_name')), 'category_name']
      ],
    });
    const categoryNames = categories.map(category => category.dataValues.category_name);
    const formattedResponse = await Promise.all(categoryNames.map(async (categoryName) => {
      const products = await Product.findAll({
        where: { category_name: categoryName },
        order: [['id', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
      return {
        categoryName,
        products: products.map(product => {
          const productData = product.dataValues;
          // Parse countries if stored as a JSON string
          if (typeof productData.countries === 'string') {
            productData.countries = JSON.parse(productData.countries);
          }
          if (typeof productData.variant === 'string') {
            productData.variant = JSON.parse(productData.variant);
          }
          return productData;
        })
      };
    }));
    res.status(200).json({
      totalItems: formattedResponse.length,
      totalPages: Math.ceil(formattedResponse.length / limit),
      currentPage: parseInt(page),
      result: formattedResponse
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.uploadImageToCloudinary = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided for upload.' });
    }

    // Upload the file to Cloudinary
    const cloudinaryRes = await uploadOnCloudinary(req.file.path);
    const imageUrl = cloudinaryRes.url;
    const imagePublicId = cloudinaryRes.public_id;
    console.log(imageUrl, "Image uploaded to Cloudinary");

    // Delete the local file after uploading
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting file from local system:', err);
      } else {
        console.log('File deleted from local system');
      }
    });
    // Return the URL and public ID of the uploaded image
    return res.status(200).json({ url: imageUrl, public_id: imagePublicId });
  } catch (error) {
    console.error("Error in uploadImageToCloudinary:", error);
    return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
  }
};


exports.deleteImageFromCloudinary = async (req, res) => {
  const { public_id } = req.body; // Expecting public_id in the request body

  try {
    if (!public_id) {
      return res.status(400).json({ error: 'Public ID is required to delete an image.' });
    }

    // Call Cloudinary API to delete the image
    const deletionResponse = await deleteOnCloudinary(public_id);
    if (deletionResponse.result === 'ok') {
      console.log("Image deleted from Cloudinary:", public_id);
      return res.status(200).json({ message: 'Image successfully deleted from Cloudinary.' });
    } else {
      return res.status(400).json({ error: 'Failed to delete the image from Cloudinary.' });
    }
  } catch (error) {
    console.error("Error in deleteImageFromCloudinary:", error);
    return res.status(500).json({ error: 'An error occurred while deleting the image from Cloudinary.' });
  }
};
