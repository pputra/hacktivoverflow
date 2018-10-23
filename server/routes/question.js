var express = require('express');
var router = express.Router();
const QuestionController = require('../controllers/questionController');
const Middlewares = require('../middlewares/index');

router.get('/', QuestionController.showAll);


router.get('/:id', QuestionController.findById);

router.use(Middlewares.isLogin);


router.post('/', QuestionController.create);

router.delete('/:id', QuestionController.delete);

router.put('/:id', QuestionController.update);

router.patch('/upvote/:id', QuestionController.upvote);

router.patch('/downvote/:id', QuestionController.downvote);



module.exports = router;