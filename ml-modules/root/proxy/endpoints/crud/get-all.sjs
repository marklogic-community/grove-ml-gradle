'use strict';

const crud = require('../../lib/crud.sjs');

let id = crud.extractIdFromUrl(xdmp.getOriginalUrl());

crud.view(id);
