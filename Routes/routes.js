require('dotenv').config({ path: './process.env' });

// const uri = process.env.MONGO_URI;
const express = require('express');
const router = express.Router();
// const { MongoClient } = require("mongodb");
const userModel = require('../models/userModel');
const jwtSchema = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const client = new MongoClient(uri);
// const connecToDatebase = async () => {
//   try {
//     await client.connect();
//     console.log("Connected to the database");
//   } catch (error) {
//     console.error("Error connecting to the database", error);
//   }
// };

// router.get('/users', async (req, res) => {
//   try {
//     // await connecToDatebase();
//     // const dbo = client.db("ck");
//     // const collection = dbo.collection("users_data");
//     // const result = await collection.find({}).toArray();
//     // console.log(result);
//     const users = await userModel.find();
//     console.log(users);

//     res.status(200).send(users);
//     // res.send(result);
//   } catch (error) {
//     console.error('Error getting data', error);
//     res.send('Error getting data');
//   }
// });
// Generate Access and Refresh Tokens
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET);
};
router.post('/register', async (req, res) => {
  try {
    // await connecToDatebase();
    // const dbo = client.db('ck');
    console.log(req.body);

    // const collection = dbo.collection('users_data');
    const userExists = await userModel.findOne({
      userName: req.body.userName,
    });
    if (userExists) {
      return res.status(400).json({ error: 'User already registered!' });
    }

    const user = new userModel(req.body);
    console.log(user);
    await user.validate();
    // if (!user) return res.status(400).send({ error: 'Invalid data' });
    await user.save();
    res.status(201).json(user);
    // console.log("collection data", req.body);

    // const result = await collection.insertOne(req.body);

    // res.send(result);
    // res.status(201).json('User registered successfully');
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'MongoServerError') {
      // Handle Mongoose validation errors
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
    console.error('Error inserting data', error);
    res.send('Error inserting data');
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await userModel.findOne({
      userName: req.body.userName,
    });
    console.log(user);

    if (!user) return res.status(404).send({ error: 'User not found' });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(401).send({ error: 'Invalid credentials' });

    console.log('user', user);
    // user.tokens = user.tokens.concat({ token });
    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    //  await user.save();

    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    // res.status(200).send(user);
  } catch (error) {
    console.error('Error logging in', error);
    res.send('Error logging in');
  }
});

// Token Validation Middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).json({ error: 'Access denied' });

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: 'Invalid or expired token' });
//     req.user = user;
//     next();
//   });
// };

// Validate Refresh Token Endpoint
// app.post('/token', async (req, res) => {
//   const { token } = req.body;
//   if (!token) return res.status(401).json({ error: 'Refresh token required' });

//   try {
//     const user = await User.findOne({ refreshToken: token });
//     if (!user) return res.status(403).json({ error: 'Invalid refresh token' });

//     // Verify refresh token
//     jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err) => {
//       if (err) return res.status(403).json({ error: 'Invalid refresh token' });

//       // Generate a new access token
//       const accessToken = generateAccessToken(user);
//       res.status(200).json({ accessToken });
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     await connecToDatebase();
//     const dbo = client.db('ck');
//     const collection = dbo.collection('users_data');

//     const user = await collection.findOne({
//       user_name: req.body.user_name,
//       password: req.body.password,
//     });
//     // console.log(result);
//     if (!user) return res.status(404).send({ error: 'User not found' });

//     // const isMatch = await bcrypt.compare(password, user.password);
//     // if (!isMatch) return res.status(401).send({ error: "Invalid credentials" });

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });
//     console.log('token', token);

//     // user.tokens = user.tokens.concat({ token });
//     // await user.save();
//     console.log('user', user);
//     console.log('token', token);

//     res.send({ message: 'Login successful', token });
//     // if (result) {
//     //   res.status(200).json("User logged in successfully");
//     // } else {
//     //   res.status(400).json("Invalid credentials");
//     // }
//   } catch (error) {
//     console.error('Error logging in', error);
//     res.send('Error logging in');
//   }
// });
module.exports = router;
