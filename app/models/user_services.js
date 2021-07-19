const mysql = require('../core/lib/dbconn');

const UserService = function(userService) {
    this.user_id = userService.user_id;
    this.service_id = userService.service_id,
    this.active = userService.active
};

UserService.create = (newUserService, result) => {
    mysql.query("INSERT INTO user_services SET ?", newUserService, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
  
      console.log("created user_service: ", { id: res.insertId, ...newUserService });
      result(null, { id: res.insertId, ...newUserService });
    });
};

module.exports = UserService;
