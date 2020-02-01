const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    providerId: String,
    first_name: String,
    last_name: String,
    credits: { type: Number, default: 0}
});

mongoose.model('users', userSchema);