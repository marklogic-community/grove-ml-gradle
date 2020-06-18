'use strict';

const auth = require('../../lib/auth.sjs');

// request body params
let body = xdmp.getRequestBody('json').toObject() || {};
let username = body.username;
let password = body.password;

if (username === undefined || password === undefined) {
  fn.error(null, 'GROVE-MISSING-REQUIRED', ['username', 'password']);
} else {
  var loggedIn = auth.login(username, password);

  if (loggedIn.authenticated) {
    loggedIn;
  } else {
    fn.error(null, 'GROVE-INVALID-CREDS');
  }
}
