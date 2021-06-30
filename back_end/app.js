const express = require('express');
const app = express();

app.use((req, res) => { // For each req
    res.json({ messge: "request received" }); // send back json obj

});

module.exports = app;