const config = require('../../config/config');
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: (config.node_env == "test") ? "promo_test" : "promo"
});

conn.connect(function(err) {
  if (err) throw err;
  conn.query("CREATE TABLE IF NOT EXISTS \
        services(id int AUTO_INCREMENT, name VARCHAR(255), description VARCHAR(255), promocode VARCHAR(255), \
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY(id))")
  conn.query("CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), \
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY(id))")
  conn.query("CREATE TABLE IF NOT EXISTS user_services(id int AUTO_INCREMENT, user_id int, service_id int, active ENUM('1','0'), \
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY(id))")
  console.log("MYSQL DB Connected!");
});

module.exports = conn;
