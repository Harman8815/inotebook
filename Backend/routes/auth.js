const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');  // Correct library name
const JWT_SECRET = "secret";

router.post(
    '/createuser',
    [
        // Validate body fields
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(409).json({ error: 'User with this email already exists' });
            }

            user = new User({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
            });

            await user.save();

            const data = {
                user: {
                    id: user.id
                }
            };

            const jwtData = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token: jwtData, user: { id: user.id, name: user.name, email: user.email } });

        } catch (error) {
            res.status(500).json({ error: 'Server error: ' + error.message });
        }
    }
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            const jwtData = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token: jwtData });

        } catch (error) {
            res.status(500).json({ error: 'Server error: ' + error.message });
        }
    }
);

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
