'use strict';

const crud = (function() {
  const type = 'all';

  // mapping URIs to ids for CRUD in other routes
  // even possibly going so far as to return IDs instead of URIs
  // /dogs/1587 instead of dogs?uri=/somethingUgly
  // It is helpful to share this logic between search and CRUD routes,
  // particularly those referencing the same type.
  const idConverter = {
    toId: function(uri) {
      return encodeURIComponent(uri);
    },
    toUri: function(id) {
      return decodeURIComponent(id);
    }
  };

  var config = {
    directory: '/' + type + '/',            // default: '/'
    extension: 'json',                      // (default)
    contentType: '*/*',                     // default: application/json
    //temporalCollection: 'uni-temporal',   // default: none
    collections: ['data', 'type/' + type],  // default: none
    idConverter: idConverter,               // default: encode/decodeUriComponent
    views: {
      // By default, a single `metadata` view is configured.
      // This metadata view returns metadata including contentType,
      // fileName, format, and size of the entity. It is particularly
      // useful for binaries.
      //
      // There is also an implicit `_default` view, which is invoked
      // when the crud endpoint is called with only an id (not followed by
      // a view name). You can change the behavior of this implicit view
      // by configuring a view named `_default`.
      //
      // The client can access different views when performing a READ
      // by adding a view name after the id, as in:
      // '/api/crud/all/someID/indent'
      //
      // Supported view configuration options include `transform`,
      // `category`, `format` (which defaults to 'json'),
      // `contentType` (the mimetype that will be sent to the browser,
      // which defaults to the top-level contentType for the route),
      // `call` (a function to override the middle-tiers READ logic,
      // which receives req, res, config, id, and the viewName as arguments)
      'to-json': {
        transform: 'to-json'
      },
      indent: {
        transform: 'indent'
      }
    }
  };

  function newId() {
    return idConverter.toId(config.directory + xdmp.random() + config.extension);
  }

  const extractIdFromUrl = function(url) {
    return decodeURIComponent(url.replace(/[?].*/, '').replace('/api/crud/' + type, ''));
  }

  const create = function(id, content) {
    let uri = (id !== undefined) ? idConverter.toUri(id) : newId();

    if (fn.docAvailable(uri)) {
      fn.error(null, 'GROVE-DOC-EXISTS');
    } else {
      xdmp.documentInsert(uri, content, {
        collections: config.collections
      });
      return uri;
    }
  };

  const del = function(id) {
    let uri = idConverter.toUri(id);

    if (fn.docAvailable(uri)) {
      xdmp.documentDelete(uri);
    } else {
      fn.error(null, 'GROVE-DOC-NOT-FOUND');
    }
  };

  const update = function(id, content) {
    let uri = idConverter.toUri(id);

    if (fn.docAvailable(uri)) {
      xdmp.documentInsert(uri, content, {
        collections: config.collections
      });
    } else {
      fn.error(null, 'GROVE-DOC-NOT-FOUND');
    }
  };

  const view = function(id) {
    let uri = idConverter.toUri(id);

    if (fn.docAvailable(uri)) {
      return cts.doc(uri);
    } else {
      fn.error(null, 'GROVE-DOC-NOT-FOUND');
    }
  };

  return {
    extractIdFromUrl: extractIdFromUrl,
    create: create,
    delete: del,
    update: update,
    view: view
  };
})();

module.exports = crud;
