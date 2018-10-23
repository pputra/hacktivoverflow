var express = require('express');
var router = express.Router();
const Middlewares = require('../middlewares');
const AnswerController = require('../controllers/answerController');

router.use(Middlewares.isLogin);
router.post('/:id', AnswerController.create);
router.delete('/:id', AnswerController.delete);
router.get('/:id', AnswerController.showAll);

router.patch('/upvote/:id', AnswerController.upvote);
router.patch('/downvote/:id', AnswerController.downvote);

module.exports = router