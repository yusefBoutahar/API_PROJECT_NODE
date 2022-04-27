const router = require('express').Router();
const controller = require('./forums.controller');

router.get('/', controller.getAllForums);
router.get('/:id', controller.getForumById);
router.get('/game/:gameId', controller.getAllForumsByGame);
router.post('/', controller.addForum);
router.delete('/:id', controller.deleteForum);
router.patch('/:id', controller.updateForum);

module.exports = router;