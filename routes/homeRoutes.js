const express = require('express');
const router = express.Router();
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
    try {
        const dbBlogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'UserName'],
                },
            ],
        });

        const blogs = dbBlogData.map((blog) =>
            blog.get({ plain: true })
        );

        res.render('homepage', {
            blogs,
            loggedIn: req.session.loggedIn,
            userInfo: req.session.userInfo
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/create', (req, res) => {
    res.render('signup');
})

router.get('/dashboard', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect("/");
        }

        if (req.session.loggedIn) {
            return res.redirect(`/dashboard/${req.session.userInfo.id}`)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard/:id', (req, res) => {
    User.findByPk(req.params.id,{
        include:[Blog]
    }).then(userData => {
        const blogUser = userData.get({ plain: true });
        res.render('dashboard', {
            blogUser, 
            loggedIn: req.session.loggedIn,
            userInfo: req.session.userInfo
        })
        console.log(blogUser)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/dashboard/create', (req, res) => {
    res.render('createblog');
})

module.exports = router;