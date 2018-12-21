'use strict';

declareUpdate();

const crud = require('../../lib/crud.sjs');

let id = crud.extractIdFromUrl(xdmp.getOriginalUrl());
let content = xdmp.getRequestBody();

var uri = crud.create(id, content);
xdmp.addResponseHeader('Location', uri);
xdmp.setResponseCode(201, 'Created');
