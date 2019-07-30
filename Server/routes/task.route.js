const express = require('express');
const router = express.Router();

const todo_controller = require('../controllers/task.controller');

router.get('/', todo_controller.todoes);
router.get('/currentUser', todo_controller.user_tasks);
router.post('/create', todo_controller.todo_create);
router.get('/:id', todo_controller.todo_details);
router.put('/:id/update', todo_controller.todo_update);
router.delete('/:id/delete', todo_controller.todo_delete);
module.exports = router;