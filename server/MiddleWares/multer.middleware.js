// 
const multer = require("multer");
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = "./public/temp";
        // Check if directory exists, if not, create it
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const dynamicFields = (req, res, next) => {
    const { sections } = req.body;
    if (sections && sections.type === 'images') {
      req.uploadFields = [
        { name: 'images', maxCount: 1 }, // Main blog image
        { name: 'section', maxCount: 10 } // Array of images in section.content
      ];
    } else {
      req.uploadFields = [
        { name: 'image', maxCount: 1 } // Only main blog image
      ];
    }
    next();
  };
//   function prepareFilesMiddleware(req, res, next) {
//     const payload = req.body; // Assuming payload is in the request body
//     const files = [];
// console.log('payload....................................',req.body)

//     // Iterate over sections to find and organize images
//     payload.sections.forEach((section, index) => {
//         if (section.type === 'images') {
//             section.content.forEach((image, idx) => {
//                 // Create a file object for Multer
//                 const file = {
//                     fieldname: `sectionContentimages${index + 1}`,
//                     originalname: `image_${index + 1}_${idx}.jpg`, // Adjust as needed
//                     encoding: 'binary',
//                     mimetype: 'image/jpeg', // Adjust as needed
//                     buffer: image
//                 };
                
//                 files.push(file);
//             });
//         }
//     });
// console.log('my files  Array.apply.............................',files)
//     // Attach files array to request object
//     req.filesArray = files;

//     next();
// }


// Middleware to attach files to req.files
function attachFilesMiddleware(req, res, next) {
  const uids = [
    'rc-upload-1723187323236-6',
    'rc-upload-1723187323236-8',
  ];

  Promise.all(uids.map(uid => fetchFile(uid)))
    .then(files => {
      req.files = files.map(file => {
        return {
          fieldname: 'files',
          originalname: file.name,
          encoding: '7bit',
          mimetype: file.mimetype,
          buffer: file.data,
          size: file.size
        };
      });
      next();
    })
    .catch(err => {
      next(err);
    });
}

const upload = multer({ storage });
module.exports = {
    upload,
    dynamicFields,
    // prepareFilesMiddleware,
    attachFilesMiddleware
};
