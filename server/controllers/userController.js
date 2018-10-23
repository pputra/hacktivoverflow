const User = require('../models/user');
const encryptPassword = require('../helpers/encryptPassword');
const Token = require('../helpers/token');

module.exports = {
    create: (req, res) => {
       
        let {first_name, last_name, email, password} = req.body;
        console.log('masuk');
        let user = new User({
            first_name,
            last_name,
            email,
            password,
            oauth: false
        });
        console.log(user);
        user.save()
            .then((newUser) => {
                console.log(newUser);
                res.status(201).json({
                    message: 'ok'
                })
            })
            .catch((err) => {
                console.log('asdf');
                res.status(400).json(err);
            });
        
        
    },

    createTest: (req, res) => {
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            oauth: false
        }).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
        });
    },

    login: (req, res) => {
        req.body.password = encryptPassword(req.body.password);
        
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }).then((result) => {
            
            if (result) {
                let token = Token.sign(result);
                res.status(200).json({token});
            } else {
                res.status(401).json({
                    message: 'invalid email or password'
                });
            }
        }).catch((err) => {
            res.status(400).json(err);
        });
    },

    getUserProfile: (req, res) => {
        User.findOne({
            _id: req.decoded.id
        }).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(401).json(err.message);
        });
    }
};
