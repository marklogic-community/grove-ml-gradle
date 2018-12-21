'use strict';

var error;

//console.log(error);

const resp = xdmp.getResponseCode().toArray();
var status = resp[0];
var text = resp[1];
var message = resp[1];
var url = xdmp.getOriginalUrl();
var headers = {};

var statusses = {
  'GROVE-MISSING-REQUIRED': {
    code: 400,
    text: 'Bad Request',
    message: 'Required parameters: $data'
  },
  'GROVE-UNAUTHORIZED': {
    code: 401,
    text: 'Unauthorized',
    message: 'Unauthorized: $user'
  },
  'GROVE-INVALID-CREDS': {
    code: 401,
    text: 'Unauthorized',
    message: 'Invalid username or password'
  },
  'GROVE-FORBIDDEN': {
    code: 403,
    text: 'Forbidden'
  },
  'GROVE-ENDPOINT-NOT-FOUND': {
    code: 404,
    text: 'Not Found',
    message: 'API endpoint not found'
  },
  'GROVE-DOC-NOT-FOUND': {
    code: 404,
    text: 'Not Found',
    message: 'Resource not found'
  },
  'GROVE-METHOD-NOT-ALLOWED': {
    code: 405,
    text: 'Method Not Allowed',
    message: 'Allowed methods: $data'
  },
  'GROVE-NOT-ACCEPTABLE': {
    code: 406,
    text: 'Not Acceptable',
    message: 'Supported Accept Types: $data',
    headers: {
      allow: '$data'
    }
  },
  'GROVE-DOC-EXISTS': {
    code: 409,
    text: 'Conflict',
    message: 'Resource already exists'
  },
  'GROVE-UNSUPPORTED-MEDIATYPE': {
    code: 415,
    text: 'Unsupported Media Type',
    message: 'Supported Content-Types: $data'
  },
}

if (error && error.code && statusses[error.code]) {
  error = error.toObject();
  if (!Array.isArray(error.data)) {
    error.data = [error.data];
  }

  let stat = statusses[error.code];
  status = stat.code || status;
  text = stat.text || text;
  message = stat.message || text;
  message = message.replace('$data', error.data.join(', '))
  message = message.replace('$user', xdmp.getCurrentUser() || 'default-user')
  headers = stat.headers || {};
  Object.keys(headers).forEach(key => {
    if (headers[key] === '$data') {
      headers[key] = error.data.join(', ');
    }
  });
}

var response = {
  status: status,
  statusText: text,
  message: message,
  url: url
};

xdmp.setResponseCode(status, text);
xdmp.setResponseContentType('application/json');
Object.keys(headers).forEach(key => {
  xdmp.addResponseHeader(key, headers[key]);
});
response;
