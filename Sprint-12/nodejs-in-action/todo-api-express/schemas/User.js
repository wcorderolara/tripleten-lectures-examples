const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    }
}, { timestamps: true, strict: true });

// Create the model
const User = mongoose.model('User', UserSchema);
module.exports = User;