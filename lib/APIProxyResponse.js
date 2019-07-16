class APIProxyResponse {
  constructor(callback) {
    this.callback = callback;
    this.statusCode = 200;
    this.allowCors = false;
    this.headers = {};
  }

  setHeaders(headers) {
    this.headers = headers;
    return this;
  }

  modHeaders(headers) {
    this.headers = Object.assign({}, this.headers, headers);
    return this;
  }

  setCors(value) {
    this.allowCors = value;
    return this;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  send(data) {
    const body = data;
    if (this.allowCors) {
      this.modHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      });
    }
    const response = {
      statusCode: this.statusCode,
      headers: this.headers,
      body,
    };
    if (this.callback) {
      this.callback(null, response);
    }
    return response;
  }

  json(data) {
    this.modHeaders({
      'Content-Type': 'application/json',
    });
    return this.send(JSON.stringify(data));
  }
}

module.exports = APIProxyResponse;
