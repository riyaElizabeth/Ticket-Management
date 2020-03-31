const bcrypt = require('bcryptjs');
const { myEmitter } = require('../../../../events/event')
const config = require('../../../../config/config')
const { findEmail, checkpassword } = require('./login.query');
const { validationResult } = require('express-validator');
const json = require('jsonwebtoken');
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

                res.send(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                });


            } else {

                let token = json.sign({ username }, config.secret, {
                    expiresIn: '24h'
                });
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
                res.send("login successfull!")
                myEmitter.emit('loginUser', `${req.body.email}`)
            }
        })

    } catch (e) {
        res.send({ status: 500, error: e });

    }
}

module.exports = loginUser;