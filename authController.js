// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const generateToken = require("../utils/generateToken");

// // @desc   Register new user
// // @route  POST /api/auth/signup
// // @access Public
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({ name, email, password: hashedPassword });

//     if (user) {
//       res.status(201).json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user.id),
//       });
//     } else {
//       res.status(400).json({ message: "Invalid user data" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // @desc   Login user
// // @route  POST /api/auth/login
// // @access Public
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user.id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = { registerUser, loginUser };

const User = require("../models/User");

// REGISTER
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Save user directly
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      user: { name: newUser.name, email: newUser.email, password: newUser.password },
      token: "dummy-token",
    });
  } catch (err) {
    console.error("❌ Error during user registration:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user and check password
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      user: { name: user.name, email: user.email, password: user.password },
      token: "dummy-token",
    });
  } catch (err) {
    console.error("❌ Error during user login:", err);
    res.status(500).json({ message: "Server error" });
  }
};
