var express = require('express');
var router = express.Router();
const Middlewares = require('../middlewares');
const AnswerController = require('../controllers/answerController');

router.use(Middlewares.isLogin);
router.post('/:id', AnswerController.create);
router.delete('/:id', AnswerController.delete);
router.put('/:id', AnswerController.update);
router.get('/search/:id', AnswerController.findById);
router.get('/:id', AnswerController.showAll);

router.patch('/upvote', AnswerController.upvote);
router.patch('/downvote', AnswerController.downvote);

module.exports = router