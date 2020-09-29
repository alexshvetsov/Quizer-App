const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    googleID: String

}, { versionKey: false });

userSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}
userSchema.methods.isPasswordValid = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

const User = mongoose.model("User", userSchema, "users");

module.exports = User;