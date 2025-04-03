const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      match: [/^[a-zA-Z]+$/, 'First name is invalid'],
      // validate: {
      //   validator: function (v) {
      //     return /^[a-zA-Z]+$/.test(v);
      //   },
      //   message: (props) => `${props.value} is not a valid first name!`,
      // },
    },
    lastName: {
      type: String,
      required: true,
      match: [/^[a-zA-Z]+$/, 'Last name is invalid'],
      // validate: {
      //   validator: function (v) {
      //     return /^[a-zA-Z]+$/.test(v);
      //   },
      //   message: (props) => `${props.value} is not a valid last name!`,
      // },
    },
    userName: {
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
        'Password is invalid',
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
  { collection: 'Users' }
);
// Pre-save middleware to hash password before saving to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash password
    next();
  } catch (err) {
    next(err);
  }
});

// // Post-save middleware to log user creation
userSchema.post('save', function (doc) {
  console.log(`User ${doc.userName} created successfully`);
});
// // Pre-remove middleware to log user deletion

// userSchema.pre('remove', function(next) {
//   console.log(`User ${this.userName} is being deleted`);
//   next();
// });
// // Post-remove middleware to log user deletion
// userSchema.post('remove', function(doc) {
//   console.log(`User ${doc.userName} deleted successfully`);
// });

// const jwtSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Users',
//       required: true,
//     },
//     token: {
//       type: String,
//       required: true,
//     },
//   },
//   { collection: 'Tokens' }
// );
// module.exports = mongoose.model('Tokens', jwtSchema);
module.exports = mongoose.model('Users', userSchema);
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
