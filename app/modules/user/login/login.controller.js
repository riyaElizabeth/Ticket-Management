const bcrypt = require('bcryptjs');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

const { findEmail, checkpassword } = require('./login.query');
const { validationResult } = require('express-validator');

const loginUser = async(req, res) => {
    try {
        const validation = validationResult(req);
        if (!validation.isEmpty())
            return res.send(validation);

        const username = await findEmail(req.body.email)
        if (!username)
            res.send("email doesnot exists")
        bcrypt.compare(req.body.password, username.password, function(err, isMatch) {
            if (err) {
                throw err
            } else if (!isMatch) {
                res.send("Invalid login!")


            } else {
                res.send("login successfull!")
                myEmitter.emit('loginUser', `${req.body.email}`)
            }
        })

    } catch (e) {
        res.send({ status: 500, error: e });

    }
}
myEmitter.on('loginUser', (name) => {
    console.log("Welcome " + name)
})
module.exports = loginUser;