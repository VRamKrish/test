const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

// app.listen(8080, () => {
//   console.log("Server is running on port 8080");
// });
// const express = require('express');
// const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
console.log(process.env.MONGO_USER, process.env.MONGO_PWD);

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.ddymg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB!');
  console.log('db', await db.listCollections());
});
// app.use(require("./Routes/routes"));
// Import and use the router
const userRouter = require('./Routes/routes');
app.use('/', userRouter);

app.listen(8080, () => console.log('Server is running on port 8080'));
