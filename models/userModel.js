const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      // required: true,
    },
    last_name: {
      type: String,
      // required: true,
    },
    user_name: {
      type: String,
      // required: true,
      // unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   auto: true,
    // },
  },
  { collection: 'users_data' }
);

module.exports = mongoose.model('users_data', userSchema);
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
// });

// const productSchema = new mongoose.Schema({
//     name: String,
//     price: Number,
// });

// const User = mongoose.model('User', userSchema);
// const Product = mongoose.model('Product', productSchema);

// module.exports = { User, Product };
