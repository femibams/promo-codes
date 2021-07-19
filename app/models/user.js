const mysql = require('../core/lib/dbconn');

const User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
    mysql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
    
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
}

User.find = (email, result) => {
    mysql.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
}

User.findAsync = (email) => {
    return new Promise((resolve, reject) => {
        mysql.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
            if (err) {
                reject(error);
            }
            resolve(res)
        });
    });
}

User.deleteAll = (result) => {
    mysql.query('TRUNCATE TABLE users', (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
}

module.exports = User;
