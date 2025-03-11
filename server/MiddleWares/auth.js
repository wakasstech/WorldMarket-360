const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const multer = require('multer');
const path = require('path');
const User= db.userModel;
const generateToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });
  return token.toString();
};
const verifyToken = async(req, res, next) => {
  try {
    if (!req.headers["authorization"])
      return res
        .status(401)
        .send({ errMessage: "Authorization token not found!" });
    const header = req.headers["authorization"];
    const token = header.split(" ")[1];
    await jwt.verify(token, process.env.JWT_SECRET, async(err, verifiedToken) => {
      if (err) 
        return res
          .status(401)
          .send({ errMessage: "Authorization token invalid", details: err });
          // console.log("verifiedToken:",verifiedToken);
     
     // const user = await User.findByPk(verifiedToken.id);
      const user = await User.findOne({
        where: {
          id: verifiedToken.userId,
        },
      });
      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .send({
        errMesage: "Internal server error occured!",
        details: error.message,
      });
  }
};
// adminAccessMiddleware.js
const adminAccessMiddleware = (req, res, next) => {
  if (req.user.userType !== 'admin') {
    return res.status(403).json({ errMessage: 'Access denied. Only admins can access this route.' });
  }
  next(); // Proceed to the next middleware or route handler
};
// 8. Upload Image Controller
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage,
  limits: { fileSize: '5000000'},
  fileFilter: (req, file, cb) => {
    
      const fileTypes = /jpeg|jpg|png|pdf/
      const mimeType = fileTypes.test(file.mimetype)  
      const extname = fileTypes.test(path.extname(file.originalname))
      if(mimeType && extname) {
          return cb(null, true)
      }
      cb('Give proper files formate to upload')
  }
})
module.exports = {
  generateToken,
  verifyToken,
  adminAccessMiddleware,
  upload
};
