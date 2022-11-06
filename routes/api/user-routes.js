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

router.post('/create', async (req, res) => {
    try{
        const dbUserData = User.create({
                userName: req.body.userName,
                password: req.body.password
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        })
    } catch (err) {
        console.log(err); 
        res.status(500).json({err:err})
    }
})

router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                userName: req.body.userName
            },
        });

        if(!dbUserData) {
            return res.status(400).json({ message:'Incorrect username or password. Please try again'});
        }

        // wrong password
        if(!bcrypt.compareSync(req.body.password,dbUserData.password)) {
            return res.status(401).json({msg:'Incorrect username or password. Please try again'})
        }
        //correct login
        req.session.save(() => {
            req.session.loggedIn = true; 
            console.log('it is saveeeeddd', req.session.cookie);
            res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router; 