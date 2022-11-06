const express = require('express');
const router = express.Router();
const { User, Blog } = require('../../models');
const bcrypt = require("bcrypt")

router.get('/', (req, res) => {
    User.findAll({
        include: [Blog]
    }).then(allUser => 
        res.json(allUser)
    )
})

router.post('/create', (req, res) => {
    User.create({
        userName: req.body.userName,
        password: req.body.password
    }).then(userData => {
        res.json(userData);
    }).catch(err=> {
        console.log(err); 
        res.status(500).json({err:err})
    })
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then(userData => {
        // wrong username
        if(!userData) {
            return res.status(400).json({ message:'Incorrect username or password. Please try again'});
        }
        // wrong password
        if(!bcrypt.compareSync(req.body.password,userData.password)) {
            return res.status(401).json({msg:'Incorrect username or password. Please try again'})
        }
        //correct login
        req.session.userData = {
            userName: userData.userName,
            id: userData.id
        }
        res.json(userData)
    })
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router; 