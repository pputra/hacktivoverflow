var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
    question: {type: Schema.Types.ObjectId, ref: 'Question'},
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvote: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true})

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;