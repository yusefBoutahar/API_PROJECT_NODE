const router = require('express').Router();
const controller = require('./games.controller');

router.get('/', controller.getAllGames);
router.get('/:id', controller.getGameById);
router.post('/', controller.addGame);
router.delete('/:id', controller.deleteGame);
router.patch('/:id', controller.updateGame);

module.exports = router;