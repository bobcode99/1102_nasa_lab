const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
    key: {
        type: String,
        unique: true
    },
    value: String
})

module.exports = mongoose.model("Keys", keySchema);