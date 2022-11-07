const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../../models');

router.post('/create', async (req, res) => {
    if(!req.session.userInfo) {
        return res.redirect('/login')
    }
    Comment.create({
        comment: req.body.comment,
        commenter: req.session.userInfo.userName,
        BlogId: req.session.blogNum,
    }).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err: err })
    })
});

module.exports = router;