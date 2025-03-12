require("dotenv").config({ path: "./process.env" });

const uri = process.env.MONGO_URI;
const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const client = new MongoClient(uri);
const connecToDatebase = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

router.get("/users", async (req, res) => {
  try {
    await connecToDatebase();
    const dbo = client.db("ck");
    const collection = dbo.collection("users_data");
    const result = await collection.find({}).toArray();
    console.log(result);

    res.send(result);
  } catch (error) {
    console.error("Error getting data", error);
    res.send("Error getting data");
  }
});

module.exports = router;
