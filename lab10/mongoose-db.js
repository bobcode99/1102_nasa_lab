const mongoose = require('mongoose');


const keyValueShema = mongoose.Schema({
    key: String,
    value: String
});

module.exports = mongoose.model('KeyValue', keyValueShema);