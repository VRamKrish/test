const express = require("express");
const app = express();

// app.listen(8080, () => {
//   console.log("Server is running on port 8080");
// });
// const express = require('express');
// const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// app.use(require("./Routes/routes"));
// Import and use the router
const userRouter = require("./Routes/routes");
app.use("/", userRouter);

app.listen(8080, () => console.log("Server is running on port 3000"));
