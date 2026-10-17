const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User registered successfully", user: newUser });
};


const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ 
    message: "Login successful", 
    user: { id: user.id, name: user.name, email: user.email },
    token });
};


const getUserProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ["name"],
  });

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.status(200).send(`Hello ${user.name}`);
};

module.exports = { register, login, getUserProfile };
