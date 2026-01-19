const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters long'],
        select: false
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: 'The Role {VALUE} is not valid'
        },
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    passwordChangedAt: {
        type: Date
    }
}, { timestamps: true, strict: true });

UserSchema.virtual('todos', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'user'
});

// Hash password before save the User
UserSchema.pre('save', async function() {
    if(!this.isModified('password')) {
        return;
    }

    try {
        const costFactor = 12;
        this.password = await bcrypt.hash(this.password, costFactor);

        if(!this.isNew) {
            this.passwordChangedAt = Date.now() - 1000;
        }

    } catch (error) {
        logger.error('Error hashing password:', error);
    }
})

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

// Create the model
const User = mongoose.model('User', UserSchema);
module.exports = User;