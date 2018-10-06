require('./api/data/db');
require('./api/data/user.model');
require('./api/data/questions.model');
require('./api/data/official.model');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
const app = express();

// app.set('port', 3000);
let port = process.env.PORT;

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', routes);

if (port == null || port == "") {
    port = 8000;
  }

const server = app.listen(port, (req, res) => {
    console.log("Server running on port no. " + server.address().port);
});