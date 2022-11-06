const express = require('express');
const router = express.Router();
const { User, Blog } = require('../models');
const bcrypt = require("bcrypt")

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

router.get('/dashboard/login', (req, res) => {
    res.render('afterlogin');
})

router.get('/home/login', (req, res) => {
    res.render('loginhome')
})

router.get('/create', (req, res) => {
    res.render('signup');
})


module.exports = router;