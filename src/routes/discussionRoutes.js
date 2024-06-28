const express = require('express');
const discussionController = require('../controllers/discussionController');
const authMiddleware = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/discussions',authMiddleware, discussionController.createDiscussion);
router.put('/discussions/:id',authMiddleware, discussionController.updateDiscussion);
router.delete('/discussions/:id',authMiddleware, discussionController.deleteDiscussion);
router.get('/discussions', discussionController.listDiscussions);
router.get('/discussions/tags', discussionController.searchDiscussionsByTag);
router.get('/discussions/search', discussionController.searchDiscussionsByText);
router.put('/like/:id', authMiddleware, discussionController.likeDiscussion);
router.put('/unlike/:id', authMiddleware, discussionController.unlikeDiscussion);
router.get('/:id/view', discussionController.viewDiscussion);

module.exports = router;
