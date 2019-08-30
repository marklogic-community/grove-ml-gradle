'use strict';

const search = (function() {
  var config = {};

  const buildQuery = function(filters) {
    return cts.trueQuery();
  }

  const facets = function(query, options) {
    return {};
  }

  const results = function(query, options) {
    return [];
  }

  const search = function(query, options) {
    return {
      facets: facets(query, options),
      results: results(query, options)
    }
  }

  return {
    buildQuery: buildQuery,
    results: results,
    facets: facets,
    search: search
  };
})();

module.exports = search;
