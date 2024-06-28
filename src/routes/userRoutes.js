const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users', userController.listUsers);
router.get('/users/search', userController.searchUser);
router.post('/login', userController.loginUser);
router.put('/follow/:id', authMiddleware, userController.followUser);
router.put('/unfollow/:id', authMiddleware, userController.unfollowUser);

module.exports = router;
