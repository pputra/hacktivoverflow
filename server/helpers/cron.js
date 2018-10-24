var cron = require('node-cron');
const Question = require('../models/question');


//deleting negative questions every sunday
cron.schedule('0 0 * * 7', () => {
    
    Question.find({}).then((questions) => {
        
        questions.forEach(question => {
            if (question.downvote.length > 3) {
                Question.deleteOne({_id: question._id}).then((result) => {
                    console.log('negative question has been deleted');
                }).catch((err) => {
                    console.log(err);
                });
            }
        });
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = cron;