const express = require('express');
const router = express.Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use('/', homeRoutes);

module.exports = router;