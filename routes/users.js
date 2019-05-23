const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.post('/set', controller.setUser);
router.get('/get', controller.getUsers);
router.delete('/delete/:userId', controller.delete);
router.patch('/update/:userId', controller.update);

module.exports = router