const mongoose = require('mongoose');
const User = require('./user');

const discussionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    hashtags: {
        type: [String],
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
