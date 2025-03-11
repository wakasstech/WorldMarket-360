  const dotenv=require('dotenv')
const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config()
console.log(process.env.PORT)
//  Passing parameters separately (other dialects)
const app = express()
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/json' }));
// Global Error Handling Middleware
const globalErrorHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    console.error("Global Error Handler:", error);
    res.status(500).send("Internal Server Error");
    next(error); // Pass the error to the next middleware
  }
};



app.get('/api', (req, res) => {
  res.send('Welcome to the Home Pageasdas!');
});

app.post("/api/restart", (req, res) => {
    res.send("Restarting server...");
    process.exit(1); // Exits the process to trigger a restart
});

  app.use('/api/products', require('./routes/productRoute'));
  app.use('/api/users', require('./routes/userRoute'));
  app.use('/api/categories', require('./routes/categoryRoute'));
  app.use('/api/brands', require('./routes/brandRoute'));
//   app.use('/api/logos', require('./routes/myRoute'));
  app.use('/api/blog', require('./routes/blogRoute'));
  app.use('/api/blogCategory' , require('./routes/blogcategoryRoute')); 
  app.use('/api/Ads' , require('./routes/adsRoute')); 
  app.use('/api/area', require('./routes/countryRoute')); 
  app.use('/api/featured', require('./routes/featureRoute'));
//   app.listen(process.env.PORT,()=>{
//     console.log(`Server is running ${process.env.PORT}`);
// });
app.listen()