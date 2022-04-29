const router = require('express').Router();
const controller = require('./games.controller');
const multer = require('multer');
const upload = multer();

router.get('/', controller.getAllGames);
router.get('/:id', controller.getGameById);
router.post('/', upload.single('image'), controller.addGame);
router.delete('/:id', controller.deleteGame);
router.patch('/:id', upload.single('image'), controller.updateGame);

module.exports = router;