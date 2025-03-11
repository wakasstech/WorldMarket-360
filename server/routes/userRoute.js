
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const auth =require('../MiddleWares/auth');

router.post("/createUser", userController.createUser);
router.post("/login" , userController.login)
router.get("/getUser" ,userController.getUser)



module.exports = router;








