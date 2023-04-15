const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true

    },
    password:{
        type:String,
        require:true
    }
})



UserSchema.pre('save', function (next) {
  const user = this; // Access the current user object
  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) return next(error);
    user.password = hash; // Assign the hashed password to the password field
    next(); // Continue with the save operation
  });
});


const User = mongoose.model('User',UserSchema)
module.exports = User