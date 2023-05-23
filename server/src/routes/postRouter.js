const express = require('express');
const postController = require('../controllers/postController');
const middleware = require('../middleware/authorization');

const router = express.Router();

router.use('/posts', middleware.verifyToken, postController.posts);
router.post('/createPost', middleware.verifyToken, postController.createPost);
router.put('/update/:id', middleware.verifyToken, postController.updatePost);
router.delete('/delete/:id', middleware.verifyToken, postController.deletePost);

module.exports = router;
