const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [3, 'Title must be at least 3 characters long'],
        maxLength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        default: '',
        maxLength: [500, 'Description cannot exceed 500 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    isPublic: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, strict: true })

// Create the model
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;