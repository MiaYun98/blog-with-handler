const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../models');

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
        console.log(blogs)
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
            return res.redirect("/login");
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
    User.findByPk(req.params.id, {
        include: [Blog]
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

router.get('/dashboard/blog/create', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect("/login");
        }
        res.render('createblog', {
            loggedIn: req.session.loggedIn,
            userInfo: req.session.userInfo
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/blog/comment/:id', async (req, res) => {
    Blog.findByPk(req.params.id, {
        include: [Comment, User]
    }).then(blogData => {
        var blogComm = blogData.get({ plain: true });
        console.log(blogComm)
        req.session.blogNum = req.params.id;
        res.render('commentpage', {
            blogComm,
            loggedIn: req.session.loggedIn,
            userInfo: req.session.userInfo
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

router.get('/blog/comment/add/:id', (req, res) => {
    res.render('commentadd', {
        loggedIn: req.session.loggedIn,
        userInfo: req.session.userInfo
    })
})

router.get('/dashboard/blog/edit/:id', async (req, res) => {
    Blog.findByPk(req.params.id, {
        include: [User]
    }).then(blogDb => {
        const plainBlog = blogDb.get({ plain: true });
        req.session.blogNum = req.params.id;
            console.log(plainBlog)
            res.render('editblog', {
                plainBlog,
                loggedIn: req.session.loggedIn,
                userInfo: req.session.userInfo
            })
    }).catch (err => {
        console.log(err);
        res.status(500).json(err)
    })
})
module.exports = router;