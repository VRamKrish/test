require('dotenv').config({ path: './process.env' });

// const uri = process.env.MONGO_URI;
const express = require('express');
const router = express.Router();
// const { MongoClient } = require("mongodb");
const userModel = require('../models/userModel');
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

router.get('/users', async (req, res) => {
  try {
    // await connecToDatebase();
    // const dbo = client.db("ck");
    // const collection = dbo.collection("users_data");
    // const result = await collection.find({}).toArray();
    // console.log(result);
    const users = await userModel.find();
    console.log(users);

    res.status(200).send(users);
    // res.send(result);
  } catch (error) {
    console.error('Error getting data', error);
    res.send('Error getting data');
  }
});

router.post('/register', async (req, res) => {
  try {
    // await connecToDatebase();
    // const dbo = client.db('ck');
    console.log(req.body);

    // const collection = dbo.collection('users_data');
    const user = new userModel(
      // {
      // first_name: 'Jane',
      // last_name: 'Doe',
      // user_name: 'Jane_doe_1',
      // password: 'Jane_Doe12',
      req.body
      // }
    );
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
      user_name: req.body.user_name,
    });
    console.log(user);

    if (!user) return res.status(404).send({ error: 'User not found' });
    res.status(200).send(user);
  } catch (error) {
    console.error('Error logging in', error);
    res.send('Error logging in');
  }
});

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
