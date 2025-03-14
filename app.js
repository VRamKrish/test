const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env.local' });

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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

app.listen(8080, () => console.log('Server is running on port 3000'));
