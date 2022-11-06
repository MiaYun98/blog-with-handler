const express = require('express');
const router = express.Router();

const userRoute = require('./user-routes');
router.use('/users', userRoute);

const blogRoute = require('./blog-routes');
router.use('/blogs', blogRoute);

module.exports = router; 