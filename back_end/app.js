const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user');
require('dotenv').config();

//DB connection
mongoose.connect('mongodb+srv://' + process.env.USER + ':' + process.env.PASSWORD + "@" + process.env.PATH, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussi !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type', 'Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
//Parse body request
app.use(bodyParser.json());


//ROUTES
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
module.exports = app;