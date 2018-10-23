var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
    question: {type: Schema.Types.ObjectId, ref: 'Question'},
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvote: [{type: Schema.Types.ObjectId, ref: 'User'}] 
}, {timestamps: true})

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;