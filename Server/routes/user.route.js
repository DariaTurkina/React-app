const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.post('/create', user_controller.user_create);
router.get('/login', user_controller.user_details);
router.delete('/:id/delete', user_controller.user_delete);
module.exports = router;