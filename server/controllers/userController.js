const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');
const UserModel = db.userModel;
const JWT_SECRET = process.env.JWT_SECRET
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  try {
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ name, email, password: hashedPassword });

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  try {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error });
  }
};
exports.getUser =async (req, res) => {
  try {
    // Assuming req.user.id contains the user ID from the authenticated user
    const userId = req.user.id;
    // Fetch the user details from the database using Sequelize
    const user = await UserModel.findByPk(userId, {
      attributes: { exclude: ['password'] } // Exclude sensitive fields like password
    });
    // If user is not found
    if (!user) {
     return res.status(404).json("User not found");
    }
    // Send the user details in the response
    return res
      .status(200).json({user});
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).send({ errMessage: "An error occurred while fetching the user." });
  }
}
