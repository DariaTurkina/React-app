const User = require('../models/user.model');

exports.user_create = (req, res) => {
    const { email, pwd } = req.body;
    User.find({ email: email }, function (err, isUserEmail) {
        if (isUserEmail.length === 0) {
            let user = new User({ email, pwd });
            user.save((err, DBres) => {
                if (err) res.send({ message: "Error ::", err });
                res.send({ DBres });
            });
        } else {
            res.send({ err });
        }
    });
};
exports.user_details = function (req, res) {
    const { email, pwd } = req.query;
    User.find({ email: email, pwd: pwd }, function (err, user) {
        if (err) res.send({ message: "Error", err });
        res.header('Access-Control-Allow-Origin', '*');
        res.send(user[0]);
    })
};
exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send({ message: "Error", err });
        res.send('Deleted successfully!');
    })
};