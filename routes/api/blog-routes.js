const express = require('express');
const router = express.Router();
const { User, Blog } = require('../../models');

router.get('/', async (req, res) => {
    Blog.findAll({
        include: [User]
    }).then(allBlog => {
        res.json(allBlog);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err: err })
    })
})

router.get('/:id', (req, res) => {
    User.findByPk(req.params.id, {
        include: [Blog]
    }).then(userData => {
        res.json(userData);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err: err })
    })
})

router.post('/create', async (req, res) => {
    if(!req.session.userInfo) {
        return res.redirect('/login')
    }
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        UserId: req.session.userInfo.id
    }).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err: err })
    })
});

module.exports = router;