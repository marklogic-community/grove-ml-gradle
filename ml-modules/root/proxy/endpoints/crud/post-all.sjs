'use strict';

declareUpdate();

const crud = require('../../lib/crud.sjs');

let id = crud.extractIdFromUrl(xdmp.getOriginalUrl());
let content = xdmp.getRequestBody();

crud.update(id, content);
xdmp.setResponseCode(204, 'No Content');
