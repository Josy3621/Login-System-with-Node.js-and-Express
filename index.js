const express = require('express');
const ejs = require('ejs');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const Session = require('express-session');

const app = express();

app.listen(3000, () => {
    console.log('Connected to port 3000');
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(Session({secret:'best_encryption'}))

global.loggedIn=null;
app.use('*',(req,res,next)=>{
    loggedIn=req.session.userId
    next()
})

mongoose.connect('mongodb+srv://ygsolution:Yosefhjkl0913903414.@cluster0.26pif1v.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (error) => {
    console.log('Not connected to MongoDB. Error:', error);
});

app.get('/', (req, res) => {
    res.render('index');
});

const registrationController = require('./controllers/storeUser');
app.post('/auth/registration', registrationController);

const loginController = require('./controllers/login');
const session = require('express-session');
app.post('/auth/login', loginController);

const logoutController = require('./controllers/logout');
app.get('/auth/logout', logoutController);

app.get('/successful', (req, res) => {
    if (req.session.userId) {
        res.render('successful');
    }
    else{
        console.log('your not logged In')
        res.redirect('/failed')
    }
    
});

app.get('/failed', (req, res) => {
    res.render('failed');
});
