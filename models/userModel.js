const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      match: [/^[a-zA-Z]+$/, 'is invalid'],
      // validate: {
      //   validator: function (v) {
      //     return /^[a-zA-Z]+$/.test(v);
      //   },
      //   message: (props) => `${props.value} is not a valid first name!`,
      // },
    },
    last_name: {
      type: String,
      required: true,
      match: [/^[a-zA-Z]+$/, 'is invalid'],
      // validate: {
      //   validator: function (v) {
      //     return /^[a-zA-Z]+$/.test(v);
      //   },
      //   message: (props) => `${props.value} is not a valid last name!`,
      // },
    },
    user_name: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9_]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid user name!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'is invalid',
      ],
      // validate: {
      //   validator: function (v) {
      //     return (
      //       v.length >= 8 &&
      //       /[a-z]/.test(v) &&
      //       /[A-Z]/.test(v) &&
      //       /[0-9]/.test(v) &&
      //       /[!@#$%^&*]/.test(v)
      //     );
      //   },
      //   message: (props) => `${props.value} is not a valid password!`,
      // },
    },
  },
  { collection: 'users' }
);

module.exports = mongoose.model('users', userSchema);
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
