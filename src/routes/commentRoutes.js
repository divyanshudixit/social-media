const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/comments', authMiddleware, commentController.createComment);
router.put('/comments/:id', authMiddleware, commentController.updateComment);
router.delete('/comments/:id', authMiddleware, commentController.deleteComment);
router.get('/comments/:discussionId', commentController.listCommentsByDiscussion);
router.put('/comment/like/:id', authMiddleware, commentController.likeComment);
router.put('/comment/unlike/:id', authMiddleware, commentController.unlikeComment);
router.post('/reply', authMiddleware, commentController.replyToComment);

module.exports = router;
