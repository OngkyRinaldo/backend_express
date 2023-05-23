const express = require('express');
const userController = require('../controllers/userController');
const middleware = require('../middleware/authorization');

const router = express.Router();

router.use('/users', middleware.verifyToken, userController.user);
router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.get('/getme', middleware.verifyToken, userController.getMe);
router.put('/update/:id', middleware.verifyToken, userController.updateUser);
router.delete('/delete/:id', middleware.verifyToken, userController.deleteUser);

module.exports = router;
