const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports = {
    create: (req, res) => {
        let newQuestion = new Question({
            user: req.decoded.id,
            title: req.body.title,
            content: req.body.content,      
        });

        newQuestion.save().then((question) => {
            res.status(200).json(question);
        }).catch((err) => {
            res.status(400).json(err.message);
        });
    },

    showAll: (req, res) => {
        Question.find({}).populate('user', '_id first_name last_name').populate('answer upvote downvote').then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json(err.message);
        });
    },

    delete: (req, res) => {
        Question.deleteOne({user: req.decoded.id, _id: req.params.id}).then((result) => {
            Answer.deleteMany({question: req.params.id}).then((result) => {
                res.status(200).json({
                    message: 'question has been deleted'
                });
            }).catch((err) => {
                res.status(500).json(err.message);
            });
        }).catch((err) => {
            res.status(401).json(err.message);
        });
    },

    findById: (req, res) => {
        Question.findById(req.params.id).populate('user', '_id first_name last_name').populate('answer upvote downvote').then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json(err.message);
        });
    },

    update: (req, res) => {
        Question.update({_id: req.params.id, user: req.decoded.id}, {
            title: req.body.title,
            content: req.body.content
        }, {runValidators: true}).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status.json(err.message);
        });
    },

    upvote: (req, res) => {
        Question.findOne({_id: req.params.id}).then((question) => {
            if (question.user != req.decoded.id ) {
                if (question.upvote.indexOf(req.decoded.id) === -1) {
                    question.update({
                        $push: {
                            upvote: req.decoded.id
                        }
                    }).then((result) => {
                        res.status(200).json(result);
                    }).catch((err) => {
                        res.status(500).json(err.message);
                    });
                } else {
                    question.update({
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
                    message: 'unable to upvote your own post'
                })
            }
        }).catch((err) => {
            res.status(401).json(err.message);
        });
    },

    downvote: (req, res) => {
        Question.findOne({_id: req.params.id}).then((question) => {
            if (question.user != req.decoded.id ) {
                if (question.downvote.indexOf(req.decoded.id) === -1) {
                    question.update({
                        $push: {
                            downvote: req.decoded.id
                        }
                    }).then((result) => {
                        res.status(200).json(result);
                    }).catch((err) => {
                        res.status(500).json(err.message);
                    });
                } else {
                    question.update({
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
                    message: 'unable to downvote your own post'
                })
            }
        }).catch((err) => {
            res.status(401).json(err.message);
        });
    }
};
