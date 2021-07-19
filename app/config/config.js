const dotenv = require('dotenv');

dotenv.config();

const config = {
  name: 'Promo API',
  port: process.env.PORT,
  jwt_key: process.env.TOKEN_KEY,
  node_env: process.env.NODE_ENV,
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS
  }
};

module.exports = config;
