require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = {
    sign : (user) => {
        return jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY);
    }
};



