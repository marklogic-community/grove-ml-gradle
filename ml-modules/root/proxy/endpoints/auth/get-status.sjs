'use strict';

const auth = require('../../lib/auth.sjs');

// request params
let defaultUser = xdmp.getRequestField('defaultUser', 'true');

auth.status(defaultUser);
