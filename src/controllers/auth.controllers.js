const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function registerUser(req, res) {
    const { username, email, password, role = 'user'} = req.body;

  
        if(!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required'});
    }
    else {
        const user = await userModel.findOne({
            $or: [
                {username},
                {email}
            ]
        });
         if(user) {
            return res.status(409).json({ message: 'Username or email already exists '});
        }
        else {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = new userModel({
                username,
                email,
                password: hashedPassword,
                role
            });
            await user.save();
            const token = jwt.sign({
                id: user._id,
                role: user.role
            }, process.env.JWT_SECRET);
            res.cookie('token', token);
            return res.status(201).json({ message: 'User registered successfully',
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: user.role
                }
            });
        }
    }
    }

async function loginUser(req, res) {

    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })
    if(!user) {
        return res.status(404).json({ message: 'User not found'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials'});
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role

    }, process.env.JWT_SECRET);
    res.cookie('token', token);
    return res.status(200).json({ message: 'User logged in successfully', user: {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role
    }});
}

module.exports = { registerUser, loginUser };