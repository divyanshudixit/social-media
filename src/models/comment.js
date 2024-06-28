const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    discussion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion',
        required: function() { return !this.parent; } // discussion required only if no parent comment
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    parent: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
