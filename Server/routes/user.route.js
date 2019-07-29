const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/user.controller');

router.post('/create', product_controller.product_create);
router.get('/login', product_controller.product_details);
router.delete('/:id/delete', product_controller.product_delete);
module.exports = router;