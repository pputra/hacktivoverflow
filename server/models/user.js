var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const encryptPassword = require('../helpers/encryptPassword');


var userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [
            function (val) {
    
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                
                return re.test(val);
            }
        ]  
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    first_name: {
        type: String,
        required: [true, 'first name is required']
    },
    last_name: {
        type: String,
        required: [true, 'last name is required']
    },
    oauth: {
        type: Boolean,
        required: true
    }
}, {timestamps: true});

userSchema.pre('validate', function(next) {
    console.log('masuk');
    if (this.password.split(' ').length > 1) {
        
        next(new Error('password can not contain a white space'));
        console.log('masuk');
    } else {
        console.log('aman');
        next();
    }
});

userSchema.pre('save', function (next) {

    console.log('aman2');
    this.password = encryptPassword(this.password);
    console.log(this.password);
    next();

});

var User = mongoose.model('User', userSchema);

module.exports = User;

