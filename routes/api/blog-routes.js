const express = require('express');
const router = express.Router();
const { User, Blog } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User, 
                    attributes: ['userName']
                }
            ]
        });
        res.json(blogData);
        const blogs = blogData.map((Blog) => Blog.get({plain: true}));
        res.render('dashboard', {blogs} );

    } catch (err) {
        res.status(500).json({msg:'should login first'})
    }
})

module.exports = router;