const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    key: {
        type: String,
        unique: true
    },
    gender: String,
    name: String,
    age: Number
})

module.exports = mongoose.model("Users", userSchema);