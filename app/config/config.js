const dotenv = require('dotenv');

dotenv.config();

const config = {
  name: 'Promo API',
  port: process.env.PORT
};

module.exports = config;
