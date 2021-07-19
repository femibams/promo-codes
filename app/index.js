const express = require('express')
const app = express()
const config = require('./config/config')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const serviceRoutes = require('./routes/service')
const userRoutes = require('./routes/user')
require('./core/lib/dbconn');

const { port, name } = config;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('PROMO BACKEND API');
    console.log('started');
});

// setup Routing
serviceRoutes.setup(app)
userRoutes.setup(app)

app.listen(port, () => {
    console.log('%s listening on port %s', name, port);
});

module.exports = app;