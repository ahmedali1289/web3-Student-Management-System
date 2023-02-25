const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validator = require('validator');
const crypto = require('crypto');
router.post('/signup', async (req, res) => {
    try {
        const email = req.query.email;
        const role = req.query.role;

        if (!validator.isEmail(email)) {
            return res.status(400).json({ status: "Invalid email address." });
        }

        if (!role) {
            return res.status(400).json({ status: "Role is required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "User with this email already exists." });
        }

        const withoutHashedPassword = crypto.randomBytes(10).toString("hex");
        const password = await bcrypt.hash(withoutHashedPassword, 10);
        const userData = {
            ...req.query,
            password,
        };

        const user = await User.create(userData);
        res.status(200).json({ status: 'User created!', email, role, withoutHashedPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
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
        if (user.role == 'admin') {
            if (password == user.password) {
                isPasswordValid = true
            } else isPasswordValid = false;
        }
        else {
            isPasswordValid = await bcrypt.compare(password, user.password);
        }
        if (!isPasswordValid) {
            return res.status(400).json({ status: "Incorrect password." });
        }
        var routes;
        if (user.role == 'admin') {
            routes = [
                {
                    route: 'over-view',
                    name: 'Over View'
                },
                {
                    name: 'Courses',
                    children: [
                        {
                            route: 'courses',
                            name: 'Courses'
                        },
                        {
                            route: 'add-course',
                            name: 'Add Course'
                        },
                    ]
                },
                {
                    name: 'Students',
                    children: [
                        {
                            route: 'students',
                            name: 'Students'
                        },
                        {
                            route: 'add-student',
                            name: 'Add Student'
                        },
                    ]
                },
                {
                    name: 'Teachers',
                    children: [
                        {
                            route: 'teachers',
                            name: 'Teachers'
                        },
                        {
                            route: 'add-teacher',
                            name: 'Add Teacher'
                        },
                    ]
                }
            ]
        }
        if (user.role == 'teacher') {
            routes = [
                {
                    name: 'Courses',
                    children: [
                        {
                            route: 'courses',
                            name: 'Courses'
                        }
                    ]
                },
                {
                    name: 'Students',
                    children: [
                        {
                            route: 'students',
                            name: 'Students'
                        }
                    ]
                }
            ]
        }
        if (user.role == 'student') {
            routes = [
                {
                    name: 'Courses',
                    children: [
                        {
                            route: 'courses',
                            name: 'Courses'
                        }
                    ]
                }
            ]
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        await user.save();
        res.json({ status: "Successfully login", token: token, user: user, route:routes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
