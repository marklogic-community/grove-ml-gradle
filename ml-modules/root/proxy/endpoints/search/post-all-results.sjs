'use strict';

const search = require('../../lib/search.sjs');

let searchQuery = xdmp.getRequestBody('json').toObject();

//console.log(xdmp.describe(searchQuery));

let query = search.buildQuery(searchQuery ? searchQuery.filters : null);

search.results(query, searchQuery ? searchQuery.options : null);
