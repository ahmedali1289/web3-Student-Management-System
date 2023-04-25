const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const validator = require("validator");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const config = require("../config/config");
router.post("/signup", async (req, res) => {
  try {
    const uniqueId = req.query.id;
    const email = req.query.email;
    const role = req.query.role;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ status: "Invalid email address." });
    }

    if (!role) {
      return res.status(400).json({ status: "Role is required." });
    }
    if (!uniqueId) {
      return res.status(400).json({ status: "Id is required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "User with this email already exists." });
    }

    const withoutHashedPassword = crypto.randomBytes(10).toString("hex");
    // const password = await bcrypt.hash(withoutHashedPassword, 10);
    const userData = {
      ...req.query,
      password: withoutHashedPassword,
    };

    const user = await User.create(userData);
    res.status(200).json({ status: "User created!", email, withoutHashedPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.query;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ status: "Invalid email address." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "Not able to find the user" });
    }
    var isPasswordValid;
    if (password == user.password) {
      isPasswordValid = true;
    } else isPasswordValid = false;
    if (!isPasswordValid) {
      return res.status(400).json({ status: "Incorrect password." });
    }
    var routes;
    if (user.role == "admin") {
      routes = [
        {
          route: "over-view",
          name: "Over View",
          icon: "fa-house",
        },
        {
          route: "courses",
          name: "Courses",
          icon: "fa-books",
        },
        {
          route: "students",
          name: "Students",
          icon: "fa-user-graduate",
        },
        {
          route: "teachers",
          name: "Teachers",
          icon: "fa-user-graduate",
        },
      ];
    }
    if (user.role == "teacher") {
      routes = [
        {
          route: "students",
          name: "Students",
          icon: "fa-user-graduate",
        },
        {
          route: "change-password",
          name: "Change Password",
          icon: "fa-books",
        }
      ];
    }
    if (user.role == "student") {
      routes = [
        {
          route: "attendance",
          name: "Attendance",
          icon: "fa-books",
        },
        {
          route: "courses",
          name: "Courses",
          icon: "fa-books",
        },
        {
          route: "change-password",
          name: "Change Password",
          icon: "fa-books",
        },
      ];
    }
    const token = jwt.sign(
      { userId: user._id },
      config.get(process.env.NODE_ENV).SECRET
    );
    await user.save();
    res.json({
      status: "Successfully login",
      token: token,
      user: user,
      route: routes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/users/:role", async (req, res) => {
  try {
    const role = req.params.role;
    const users = await User.find({ role: role });

    if (!users || users.length === 0) {
      return res.status(404).json({ error: `No ${role} users found` });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// router.get('/users', async (req, res) => {
//   try {
//     const token = req.header('x-auth-token');
//     if (!token) {
//       return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     const decoded = jwt.verify(token, config.get('jwtSecret'));
//     const userId = decoded.userId;

//     const user = await User.findById(userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     if (user.role !== 'admin') {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     const users = await User.find().select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });
module.exports = router;
