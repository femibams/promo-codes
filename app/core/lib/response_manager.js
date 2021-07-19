function respond(res, data, httpCode) {
    const response = {
      error: data.error,
      status: httpCode,
      message: data.message,
      data: data.response,
    };
    if (data.total) {
      response.total = data.total;
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Method', '*');
  
    res.writeHead(httpCode);
    res.end(JSON.stringify(response));
  }
  
  module.exports.success = function success(res, response, status = 200) {
    const data = response;
    data.error = false;
    respond(res, data, status);
  };
  
  module.exports.failure = function failure(res, response, httpCode = 503) {
    const data = response;
    data.error = true;
    respond(res, data, httpCode);
  };
  