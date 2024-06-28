const Discussion = require('../models/discussion');

exports.createDiscussion = async (req, res) => {
    try {
        const { text, image, hashtags } = req.body;
        const discussion = new Discussion({ text, image, hashtags, created_by: req.user.id });
        await discussion.save();
        res.status(201).json(discussion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDiscussion = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, image, hashtags } = req.body;
        const discussion = await Discussion.findById(id);
        if (!discussion) {
            return res.status(404).json({ error: 'Discussion not found' });
        }
        discussion.text = text;
        discussion.image = image;
        discussion.hashtags = hashtags;
        await discussion.save();
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteDiscussion = async (req, res) => {
    try {
        const { id } = req.params;
        const discussion = await Discussion.findById(id);
        if (!discussion) {
            return res.status(404).json({ error: 'Discussion not found' });
        }
        await Discussion.deleteOne({ _id: id });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find();
        res.status(200).json(discussions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.searchDiscussionsByTag = async (req, res) => {
    try {
        const { tags } = req.query;

        if (!tags) {
            return res.status(400).json({ error: 'Tags query parameter is required' });
        }

        const tagList = tags.split(',').map(tag => tag.trim());

        if (tagList.length === 0 || tagList[0] === '') {
            return res.status(400).json({ error: 'Tags query parameter cannot be empty' });
        }

        const discussions = await Discussion.find({ hashtags: { $in: tagList } });


        res.status(200).json(discussions);
    } catch (error) {
        console.error("Error searching discussions by tag:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.searchDiscussionsByText = async (req, res) => {
    try {
        const { text } = req.query;
        const discussions = await Discussion.find({ text: new RegExp(text, 'i') });
        res.status(200).json(discussions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.likeDiscussion = async (req, res) => {
    try {
        const { id } = req.params;
        const discussion = await Discussion.findById(id);
        if (!discussion.likes.includes(req.user.id)) {
            discussion.likes.push(req.user.id);
            await discussion.save();
            res.status(200).json({ message: 'Post liked' });
        } else {
            res.status(400).json({ error: 'Already liked this post' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unlikeDiscussion = async (req, res) => {
    try {
        const { id } = req.params;
        const discussion = await Discussion.findById(id);
        discussion.likes.pull(req.user.id);
        await discussion.save();
        res.status(200).json({ message: 'Post unliked' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.viewDiscussion = async (req, res) => {
    try {
        const { id } = req.params;
        const discussion = await Discussion.findById(id);
        discussion.views += 1;
        await discussion.save();
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};