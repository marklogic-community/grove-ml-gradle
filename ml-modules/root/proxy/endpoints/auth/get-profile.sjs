'use strict';

const auth = require('../../lib/auth.sjs');

// request body params
let username = xdmp.getCurrentUser();

xdmp.log('Getting profile for ' + username + '..');

var profile = auth.profile(username);
if (profile) {
  profile
} else {
  xdmp.setResponseCode(204, 'No Content');
}
