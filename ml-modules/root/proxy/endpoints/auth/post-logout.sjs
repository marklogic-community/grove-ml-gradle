'use strict';

const auth = require('../../lib/auth.sjs');

auth.logout();

xdmp.setResponseCode(204, 'No Content');
'';
