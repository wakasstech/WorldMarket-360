const multer = require('multer');
const path = require('path');
const fs = require('fs')
const AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: '5MQ6ZE6PRMFWWZBNAQH9',
    secretAccessKey: 'NtbD647b4EJqsiWrYQRA6T6bElDzzjGaDXujBD7s',
    region: 'ap-northeast-2',
    endpoint: 'https://s3.wasabisys.com', 
  });
  
  const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
  
  
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = 'files/';
//         if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir, { recursive: true });
//         }
//       cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   });
  
//   const upload = multer({ storage: storage });
  
  const s3 = new AWS.S3();

  
  const uploadFilesToWasabi = (req, res, next) => {
  upload.single('statment_file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading files' });
    }
    console.log(req.file)
    let file = Date.now() + "--" + req.file.originalname

    console.log(req.file)
    try {
      const params = {
        Bucket: 'stopoverpayingfess',
        Key: `root/${req.body.email}/${file}`,
        Body: req.file.buffer
      };
      const data = await s3.upload(params).promise();
      res.uploadedUrl = data.Location;

      next();
    } catch (error) {
      console.error('Error uploading file to Wasabi:', error);
      return res.status(500).json({ error: 'Internal server error Due to wasabi uploading' });
    }
  });
};

module.exports = uploadFilesToWasabi;
  
  
  
  

