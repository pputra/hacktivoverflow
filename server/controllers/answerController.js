const Answer = require('../models/answer');
const Question = require('../models/question');
const User = require('../models/user');

module.exports = {
    create: (req, res) => {
        
        User.findById(req.decoded.id).then((user) => {
            let newAnswer = new Answer({
                user: req.decoded.id,
                first_name: user.first_name,
                last_name: user.last_name,
                question: req.params.id,
                content: req.body.content
            });

            newAnswer.save().then((answer) => {

                res.status(200).json(answer);

            }).catch((err) => {
                res.status(500).json(err.message);
            });


        }).catch((err) => {
            res.status(500).json(err.message);
        });
    },

    delete: (req, res) => {
        Answer.findOneAndDelete({_id: req.body.id, user: req.decoded.id, question: req.params.id}).then((result) => {
           res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err.message);
        });
    },

    update: (req, res) => {
        Answer.updateOne({_id: req.body.id, user: req.decoded.id, question: req.params.id}, {content: req.body.content}).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(401).json(err.message);
        });
    },

    showAll: (req, res) => {
        Answer.find({question: req.params.id}).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(401).json(err.message);
        });
    },

    upvote: (req, res) => {
        Answer.findOne({_id: req.params.id}).then((answer) => {
            if (question.user != req.decoded.id ) {
                if (answer.upvote.indexOf(req.decoded.id) === -1) {
                    answer.update({
                        $push: {
                            upvote: req.decoded.id
                        }
                    }).then((result) => {
                        res.status(200).json(result);
                    }).catch((err) => {
                        res.status(500).json(err.message);
                    });
                } else {
                    answer.update({
                        $pull: {
                            upvote: req.decoded.id
                        }
                    }).then((result) => {
                        res.status(200).json(result);
                    }).catch((err) => {
                        res.status(500).json(err.message);
                    });
                }
            } else {
                res.status(400).json({
                    message: 'unable to upvote your own answer'
                })
            }
        }).catch((err) => {
            res.status(401).json(err.message);
        });
    },

    downvote: (req, res) => {
        Answer.findOne({_id: req.params.id}).then((answer) => {
            if (question.user != req.decoded.id ) {
                if (answer.downvote.indexOf(req.decoded.id) === -1) {
                    answer.update({
                        $push: {
                            downvote: req.decoded.id
                        }
                    }).then((result) => {
                        res.status(200).json(result);
                    }).catch((err) => {
                        res.status(500).json(err.message);
                    });
                } else {
                    answer.update({
                        $pull: {
                            downvote: req.decoded.id
                        }
                    }).then((result) => {
                        res.status(200).json(result);
                    }).catch((err) => {
                        res.status(500).json(err.message);
                    });
                }
            } else {
                res.status(400).json({
                    message: 'unable to downvote your own answer'
                })
            }
        }).catch((err) => {
            res.status(401).json(err.message);
        });
    }
};
