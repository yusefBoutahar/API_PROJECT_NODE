const router = require('express').Router();
const controller = require('./users.controller');

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.post('/', controller.addUser);
router.delete('/:id', controller.deleteUser);
router.patch('/:id', controller.updateUser);

module.exports = router;