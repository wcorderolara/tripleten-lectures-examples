const mongoose = require('mongoose');

const TodoListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'List name is required'],
        trim: true,
        minlength: [1, 'List name must be at least 1 character long'],
        maxlength: [100, 'List name must be at most 100 characters long']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description must be at most 500 characters long'],
        default: ''
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    }
},{
    timestamps: true,
    strict: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

TodoListSchema.virtual('todos', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'todoList'
});

const TodoList = mongoose.model('TodoList', TodoListSchema);

module.exports = TodoList;