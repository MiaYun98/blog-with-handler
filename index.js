const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session adding part over here 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:2*60*60*1000
    }
}))

// Static directory
app.use(express.static('public'));

// handlebar linking over here
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// route position 
app.use(routes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});