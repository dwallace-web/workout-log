const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {

    // console.log(req);

    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password)
    })
        .then(user => {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "14d" });
            res.status(200).json({
                user: user,
                message: "The workout user was created",
                sessionToken: token
            })
        })
        .catch(err => res.status(500).json({ error: err }));
})


router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if (matches) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '14d' });

                        res.status(200).json({
                            user: user,
                            message: "workout user has been authenticated",
                            sessionToken: token
                        })

                    } else {
                        res.status(500).json({ error: "password mismatch" })
                    }
                })

            } else {
                res.status(500).json({ error: "user not found" })
            }
        })
        .catch(err => res.status(500).json({ error: "database error" }));
});


module.exports = router;