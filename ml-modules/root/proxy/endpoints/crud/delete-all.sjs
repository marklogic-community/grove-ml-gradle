'use strict';

declareUpdate();

const crud = require('../../lib/crud.sjs');

let id = crud.extractIdFromUrl(xdmp.getOriginalUrl());

crud.delete(id);
xdmp.setResponseCode(204, 'No Content');
