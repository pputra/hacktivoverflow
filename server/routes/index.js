var express = require('express');
var router = express.Router();
const UserController = require('../controllers/userController');
const questionRoute = require('./question');
const answerRoute = require('./answer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('welcome');
});

router.post('/login', UserController.login);

router.post('/register', UserController.create);


router.use('/question', questionRoute);

router.use('/answer', answerRoute);






module.exports = router;
