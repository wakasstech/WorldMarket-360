

// // // exports.uploadlogo = async (req, res) => {
// // //   try {
// // //     const {logo}=req.file;
// // //     if (!logo) {
// // //       return res.status(404).json({ error: 'name is required' });
// // //     }
// // //     const product = await Product.create(req.body);
// // //     res.status(201).json(product);
// // //   } catch (error) {
// // //     res.status(400).json({ error: error.message });
// // //   }
// // // };
// // // Example usage


// // // detectLogos(apiKey, imagePath).then(logos => {
// // //   console.log('Detected logos:', logos);
// // // });
// const axios = require('axios');
// const fsPromises = require('fs').promises;
// const fs = require('fs');
//  // Use fs.promises for async file operations
// const base64 = require('base64-js');
// const path = require('path');
// const {removeBackground} = require("@imgly/background-removal-node");
// // Function to remove background and return Data URL
// async function removeImageBackground(imgSource) {
//   const blob = await removeBackground(imgSource);
//   const buffer = Buffer.from(await blob.arrayBuffer());

//   const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
//   return dataURL;
// }

// const detectLogos = async (apiKey, imagePath) => {
//   console.log("imagePath",imagePath)
//   const visionApiUrl = 'https://vision.googleapis.com/v1/images:annotate';
//   try {

//     const imageContent = await fsPromises.readFile(imagePath); // Use fs.promises.readFile
//     const imageBase64 = base64.fromByteArray(imageContent);
//     // Prepare the payload for the request
//     const payload = {
//       requests: [
//         {
//           image: { content: imageBase64 },
//           features: [{ type: 'LOGO_DETECTION' }]
//         }
//       ]
//     };
//     // Make the request to the Google Vision API
//     const response = await axios.post(visionApiUrl, payload, {
//       params: { key: apiKey },
//       headers: { 'Content-Type': 'application/json' }
//     });
//     console.log('Response from Google:', response.data.responses[0].logoAnnotations);
//     // Extract and process the logos from the response
//     const result = response.data;
//     const logosSet = new Set();

//     if (result.responses && result.responses[0].logoAnnotations) {
//       const logos = result.responses[0].logoAnnotations;
//       logos.forEach(logo => logosSet.add(logo.description));
//     } else if (result.responses && result.responses[0].error) {
//       console.error('Error:', result.responses[0].error.message);
//     }

//     return Array.from(logosSet);
//   } catch (error) {
//     console.error('Error:', error);
//     return [];
//   }
// };
//  // Ensure to use a secure method for storing and accessing your API key
// exports.fordetectLogos = async (req, res) => {
//   try {


//     const filePath = req.file.path; 
//     const outputPath = filePath.replace(path.extname(filePath), '-no-bg' + path.extname(filePath));
//     removeImageBackground(filePath)
//     .then(dataURL => {
//         console.log('Background removed:', dataURL);
//         const base64Data = dataURL.split(',')[1];
   
//         console.log("my output path",outputPath)
     
//        fs.writeFileSync(outputPath, Buffer.from(dataURL.split(',')[1], 'base64'));
//       console.log('Processed image saved to:', outputPath);
//     })
//     .catch(error => console.error('Error removing background:', error));
//    // Log the result to understand its structure
//    console.log("Removed background result:");
//   //  // Additional checks or processing based on result
//   console.log("outputPath",outputPath);
//     const logos = await detectLogos(process.env.GOOGLE_API_KEY, outputPath); // Await the detection of logos
//     console.log('Detected logos:', logos); // Log the detected logos

//     if (logos && logos.length > 0) {
//       res.status(200).json(logos); // Return the detected logos in the response
//     } else {
//       res.status(404).json({ error: 'No logos found' }); // Handle case where no logos are detected
//     }
//     await fs.unlink(filePath); // Unlink (delete) the file after processing
//   } catch (error) {
//     console.error('Error:', error.message); // Log error to the console
//     if (!res.headersSent) { // Check if headers are already sent before sending a response
//       res.status(500).json({ error: error.message }); // Handle any errors that occur during detection
//     }
//   }
// };
const axios = require('axios');
const fsPromises = require('fs').promises; 
const fs = require('fs');
const { format } = require('date-fns'); 
const path = require('path');
const db = require('../models/index.js');
const temproductModel = db.temproductModel;
const { removeBackground } = require("@imgly/background-removal-node");
const {uploadOnCloudinary,deleteOnCloudinary} = require('../utils/cloudinary.js');
// Function to remove background and return Data URL
// async function removeImageBackground(imgSource) {
//     const blob = await removeBackground(imgSource);
//     const buffer = Buffer.from(await blob.arrayBuffer());
//     const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
//     return dataURL;
// }
// Function to detect logos using Google Vision API
const detectLogos = async (apiKey, imagePath) => {
    console.log("imagePath", imagePath);
    const visionApiUrl = 'https://vision.googleapis.com/v1/images:annotate';
    try {
        // Read the image file and encode it to base64
        const imageContent = await fsPromises.readFile(imagePath); // Use fs.promises.readFile
        const imageBase64 = base64.fromByteArray(imageContent);
        // Prepare the payload for the request
        const payload = {
            requests: [
                {
                    image: { content: imageBase64 },
                    features: [{ type: 'LOGO_DETECTION' }]
                }
            ]
        };
        // Make the request to the Google Vision API
        const response = await axios.post(visionApiUrl, payload, {
            params: { key: apiKey },
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('Response from Google:', response.data.responses[0].logoAnnotations);

        // Extract and process the logos from the response
        const result = response.data;
        const logosSet = new Set();

        if (result.responses && result.responses[0].logoAnnotations) {
            const logos = result.responses[0].logoAnnotations;
            logos.forEach(logo => logosSet.add(logo.description));
        } else if (result.responses && result.responses[0].error) {
            console.error('Error:', result.responses[0].error.message);
        }
        return Array.from(logosSet);
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

// Function to handle the overall process
// exports.fordetectLogos = async (req, res) => {
//     try {
//         const filePath = req.file.path; 
//         const outputPath = filePath.replace(path.extname(filePath), '-no-bg' + path.extname(filePath));

//         // Remove background and save image
//         const dataURL = await removeImageBackground(filePath);
//         const base64Data = dataURL.split(',')[1];

//         await fsPromises.writeFile(outputPath, Buffer.from(base64Data, 'base64'));
//         console.log('Processed image saved to:', outputPath);
//         // Detect logos in the saved image
//         const logos = await detectLogos(process.env.GOOGLE_API_KEY, outputPath);
//         console.log("outputPath",outputPath)
//         const cloudinary_res = await uploadOnCloudinary(outputPath);
//         const processedImageUrl = cloudinary_res.url;
//         console.log("Cloudinary path of uploaded processed image:", processedImageUrl);
//         console.log('Detected logos:', logos);
//         if (logos && logos.length > 0) {
//             res.status(200).json({
//                 logos,
//                 'processedImageUrl': processedImageUrl ? processedImageUrl: ''
//             });
//         } else {
//             res.status(404).json({ error: 'No logos found' });
//         }
//         // Delete the original file after processing
//         await fsPromises.unlink(filePath);
//         await fsPromises.unlink(outputPath);
//         console.log('Original file deleted:', filePath);
//     } catch (error) {
//         console.error('Error:', error.message);
//         if (!res.headersSent) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// };


// exports.removeBackground = async (req, res) => {
//     try {
//         const filePath = req.file.path;
//         const outputPath = filePath.replace(path.extname(filePath), '-no-bg' + path.extname(filePath));

//         // Remove background and save image
//         const dataURL = await removeImageBackground(filePath);
//         const base64Data = dataURL.split(',')[1];

//         await fsPromises.writeFile(outputPath, Buffer.from(base64Data, 'base64'));
//         console.log('Processed image saved to:', outputPath);

//         // Optionally upload to Cloudinary and return URL
//         const cloudinary_res = await uploadOnCloudinary(outputPath);
//         const processedImageUrl = cloudinary_res.url;
//         console.log("Cloudinary path of uploaded processed image:", processedImageUrl);

//         // Respond with the URL of the processed image
//         res.status(200).json({
//             processedImageUrl: processedImageUrl || ''
//         });

//         // Clean up
//         await fsPromises.unlink(filePath);
//         await fsPromises.unlink(outputPath);
//         console.log('Original and processed files deleted.');

//     } catch (error) {
//         console.error('Error:', error.message);
//         if (!res.headersSent) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// };
exports.detectLogos = async (req, res) => {
    try {
        const  imageUrl  = req.file.path; // URL of the image from which background was removed

        // Detect logos in the image
        const logos = await detectLogos(process.env.GOOGLE_API_KEY, imageUrl);
        console.log('Detected logos:', logos);
// Generate folder name with today's date
const today = new Date();
const formattedDate = format(today, 'yyyy-MM-dd'); 
const folderName = logos && logos.length > 0 ? 
    `LogosDetected/${formattedDate}` : 
    `LogosNotDetected/${formattedDate}`;

// Upload to Cloudinary and return URL
const cloudinary_res = await uploadOnCloudinary(imageUrl, folderName);
const processedImageUrl = cloudinary_res.url;
console.log("Cloudinary path of uploaded processed image:", processedImageUrl);

        if (logos && logos.length > 0) {
            res.status(200).json({ logos });
        } else {
            res.status(404).json({ error: 'No logos found' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        }
    }
};
exports.addProductByUser = async (req, res) => {
    try {
      const { product_name, brand_id, category_id,description } = req.body;
      // Check if the required fields are provided
      if (!product_name) {
        return res.status(404).json({ error: 'name is required' });
      }
       // Check if a category with the same name already exists
   const existingProduct = await temproductModel.findOne({ where: { product_name } });
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
  
      // Create the product with the image URL, brand ID, and category ID
      const product = await temproductModel.create({
      ...req.body,
        logo,
        logo_pid,   
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };