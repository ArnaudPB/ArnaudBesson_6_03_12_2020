const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce')

//DB connection
mongoose.connect('mongodb+srv://root:cwJmnBNvydcfvfcf@cluster0.akxpe.mongodb.net/DB-P6?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussi !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

/**
 * middlewares
 */
//autoriser le cors

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type', 'Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
//Parse body request
app.use(bodyParser.json());

/**
 * Routes
 */

app.use('/api/sauces', sauceRoutes);
module.exports = app;