'use strict';

const ping = (function() {
  var config = {
    name: 'grove-ml-gradle, 2-tier',
    version: '1.0.0-rc.2'
  };

  const pong = function() {
    return {
      ping: 'pong',
      name: config.name,
      version: config.version
    };
  }

  return {
    pong: pong
  };
})();

module.exports = ping;
