const router = require('express').Router();
const controller = require('./messages.controller');
const validationUserToken = require('../middleware/validationUserToken')

router.get('/', controller.getAllMessages);
router.get('/:id', controller.getMessageById);
router.get('/user/:userId', validationUserToken, controller.getAllMessagesByOwner);
router.get('/forum/:forumId', controller.getAllMessagesByForum);
router.post('/', controller.addMessage);
router.delete('/:id', controller.deleteMessage);
router.patch('/:id', controller.updateMessage);

module.exports = router;