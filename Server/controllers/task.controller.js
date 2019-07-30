const Todo = require('../models/task.model');

exports.todo_create = function (req, res) {
    let todo = new Todo(
        {
            name: req.body.name,
            status: req.body.status,
            userID: req.body.userID
        }
    );
    todo.save(function (err) {
        if (err) res.send({ message: "Error", err });
        res.send('Todo created successfully')
    })
};

exports.todoes = function (req, res) {
    Todo.find({}, function (err, todo) {
        if (err) res.send({ message: "Error", err });
        res.header('Access-Control-Allow-Origin', '*');
        res.send(todo);
    })
};
exports.user_tasks = function (req, res) {
    const { userID } = req.query;
    Todo.find({ userID: userID }, function (err, tasks) {
        if (err) res.send({ message: "Error", err });
        res.send(tasks);
    })
};
exports.todo_details = function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (err) res.send({ message: "Error", err });
        res.send(todo);
    })
};
exports.todo_update = function (req, res) {
    Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, todo) {
        if (err) res.send({ message: "Error", err });
        res.send('Todo udpated.');
    });
};
exports.todo_delete = function (req, res) {
    Todo.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send({ message: "Error", err });
        res.send('Deleted successfully!');
    })
};