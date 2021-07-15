const restify = require('restify');
const config = require('./config/config')
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const corsMiddleware = require('restify-cors-middleware2');

const { port, name } = config;
const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*']
  });

const app = restify.createServer();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.pre(cors.preflight);
app.use(cors.actual);

app.get('/', (req, res) => {
    res.send('PROMO BACKEND API');
    console.log('started');
});

// setup Routing

app.listen(port, () => {
    console.log('%s listening on port %s', name, port);
});