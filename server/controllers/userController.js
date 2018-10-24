require('dotenv').config();
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');
const User = require('../models/user');
const encryptPassword = require('../helpers/encryptPassword');
const Token = require('../helpers/token');

module.exports = {
    create: (req, res) => {
       
        let {first_name, last_name, email, password} = req.body;
        
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

    /* createTest: (req, res) => {
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
    }, */

    login: (req, res) => {
        req.body.password = encryptPassword(req.body.password);
        
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }).then((result) => {
            
            if (result) {
                let token = Token.sign(result);
                res.status(200).json({
                    token: token,
                    id: result._id
                });
            } else {
                res.status(401).json({
                    message: 'invalid email or password'
                });
            }
        }).catch((err) => {
            res.status(400).json(err);
        });
    },

    googleSignIn(req, res) {

        let googleToken = req.body.token;
        console.log('masuk google');
        var ticket = new Promise((resolve, reject) => {
            client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            }, (err, data) => {

                if (err) {
                    reject(err);
                } else {
                    const payload = data.getPayload();

                    const userId = payload['sub'];
                    resolve(userId);
                }
            })
        }).then((userId) => {

            axios({
                method: 'GET',
                url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
            }).then((result) => {
                
                User.findOne({
                    email: result.data.email
                }).then((user) => {
                   
                    if (user) {
                        
                        let token = Token.sign(user);

                        
                        res.status(200).json({
                            token: token,
                            id: result._id
                        });
                        

                    } else {
                       
                        let firstName = result.data.name.split(' ')[0];
                        let lastName = result.data.name.split(' ')[1];

                       

                        User.create({
                            email: result.data.email,
                            password: process.env.PASSWORD_GOOGLE,
                            oauth: true,
                            first_name: firstName,
                            last_name: lastName
                        }).then((user) => {
                            res.status(200).json({
                                token: token,
                                id: result._id
                            });
                        }).catch((err) => {
                            
                            res.status(500).json(err.message);
                            
                        }); 
                    }
                }).catch((err) => {
                    res.status(500).json(err);
                });

            }).catch((err) => {
                res.status(500).json(err);
            });

        }).catch((err) => {
            res.status(500).json(err);
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
