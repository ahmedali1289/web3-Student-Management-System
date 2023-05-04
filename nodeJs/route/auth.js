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
const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "xsmtpsib-a6f5dfeefede4b037e16edc983421e174d089636b04fc7a11d102136691e0c38-xDjH91UA8ESWXtZz";
const emailApi = new SibApiV3Sdk.EmailCampaignsApi();
router.post("/signup", async (req, res) => {
  try {
    const uniqueId = req.query.id;
    const email = req.query.email;
    const name = req.query.name;
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
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "Student Management System",
      email: "sms@sms.com",
    };
    sendSmtpEmail.to = [{ email: "ahmedakhter1289@gmail.com", name: name }];
    sendSmtpEmail.subject = "Registration Completed";
    sendSmtpEmail.htmlContent = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Welcome to SMS!</title>
      </head>
      <body style="background-color: #f2f2f2; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; margin: 0; padding: 0;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f2f2f2">
          <tr>
            <td align="center" valign="top">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 6px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td align="center" valign="top" style="padding: 40px;">
                    <h1>SMS</h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top" style="padding: 20px 40px;">
                    <p style="font-size: 24px; font-weight: bold; margin: 0;">Welcome ${name}!</p>
                    <hr style="border: 0; border-bottom: 2px solid #f2f2f2; margin: 20px 0;">
                    <p style="font-size: 16px; margin: 0;">Welcome to SMS! We are thrilled to have you as a part of our school community. Please log in to your system and update your password. Your current login credentials are:</p>
                    <table cellpadding="5" cellspacing="0" border="0" width="100%" style="border: 1px solid #ccc; border-collapse: collapse; margin: 20px 0;">
                      <tr>
                        <td width="120" style="border-right: 1px solid #ccc; font-weight: bold; padding: 5px;">Email:</td>
                        <td style="padding: 5px;">${userData?.email}</td>
                      </tr>
                      <tr>
                        <td width="120" style="border-right: 1px solid #ccc; font-weight: bold; padding: 5px;">Password:</td>
                        <td style="padding: 5px;">${userData?.password}</td>
                      </tr>
                    </table>
                    <p style="font-size: 16px; margin: 20px 0 0;">Thank you!</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data)
        );
      },
      function (error) {
        console.error(error);
      }
    );
    const user = await User.create(userData);
    res.status(200).json({ status: "User created!", user });
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
          route: "students",
          name: "Students",
          icon: "fa-user-graduate",
        },
        {
          route: "change-password",
          name: "Change Password",
          icon: "fa-books",
        },
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
    user.token = token; // Add token to user object and save it to the database
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
router.get("/users/:role", authenticateToken, async (req, res) => {
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
router.post("/change-password", async (req, res) => {
  // console.log(req)
  try {
    const { id, oldPassword, newPassword } = req.query;
    console.log(id, oldPassword, newPassword, req.query);
    // Check if oldPassword and newPassword are present
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ status: "Old password and new password are required." });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ status: "User not found." });
    }

    // Check if old password is correct
    if (oldPassword !== user.password) {
      return res.status(400).json({ status: "Incorrect old password." });
    }

    // Update user's password
    user.password = newPassword;
    await user.save();

    res.json({
      status: "Password updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({ status: "Not able to find the user" });
    }
    res.json({
      status: "Successfully fetched user details",
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ status: "Unauthorized" });
  }
  jwt.verify(token, config.get(process.env.NODE_ENV).SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ status: "Forbidden" });
    }
    req.user = user;
    next();
  });
}

module.exports = router;
