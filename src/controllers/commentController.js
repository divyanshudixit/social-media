const Comment = require('../models/comment');
const Discussion = require('../models/discussion');

exports.createComment = async (req, res) => {
    try {
        const { text, discussionId } = req.body;
        const comment = new Comment({ text, created_by: req.user.id, discussion: discussionId });
        await comment.save();

        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ error: 'Discussion not found' });
        }

        discussion.comments.push(comment._id);
        await discussion.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        comment.text = text;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        await comment.remove();

        // Update the discussion's comment count
        const discussion = await Discussion.findById(comment.discussion);
        discussion.comments.pull(comment._id);
        await discussion.save();

        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listCommentsByDiscussion = async (req, res) => {
    try {
        const { discussionId } = req.params;
        const comments = await Comment.find({ discussion: discussionId }).populate('created_by', 'name');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.likeComment = async (req, res) => {
    
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        if (!comment.likes.includes(req.user.id)) {
            comment.likes.push(req.user.id);
            await comment.save();
            res.status(200).json({ message: 'Comment liked' });
        } else {
            res.status(400).json({ error: 'Already liked this comment' });
        }
    } catch (error) {
        console.log('likeComment: Error -', error);
        res.status(500).json({ error: error.message });
    }
};

exports.unlikeComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        comment.likes.pull(req.user.id);
        await comment.save();
        res.status(200).json({ message: 'Comment unliked' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.replyToComment = async (req, res) => {
    try {
        const { text, commentId } = req.body;
        const parentComment = await Comment.findById(commentId);
        if (!parentComment) {
            return res.status(404).json({ error: 'Parent comment not found' });
        }

        const reply = new Comment({ 
            text, 
            created_by: req.user.id, 
            parent: commentId, 
            discussion: parentComment.discussion 
        });
        await reply.save();

        parentComment.replies.push(reply._id);
        await parentComment.save();

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};