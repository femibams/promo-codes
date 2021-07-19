const mysql = require('../core/lib/dbconn');

const Service = function(service) {
    this.name = service.name;
    this.description = service.description,
    this.promocode = service.promocode
};

Service.create = (newService, result) => {
    mysql.query("INSERT INTO services SET ?", newService, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
  
      console.log("created service: ", { id: res.insertId, ...newService });
      result(null, { id: res.insertId, ...newService });
    });
};

Service.find = (searchParam, result) => {
    console.log(searchParam)
    let query
    let { page, size } = searchParam
    let offset = (page - 1) * size;
    if(searchParam.name) {
        query = `SELECT * FROM services WHERE name = '${searchParam.name}' LIMIT ${offset},${size}`;
    } else {
        query = `SELECT * FROM services LIMIT ${offset},${size}`;
    }
    
    mysql.query(query, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
}

Service.deleteAll = (result) => {
    mysql.query('TRUNCATE TABLE services', (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
}

module.exports = Service;
