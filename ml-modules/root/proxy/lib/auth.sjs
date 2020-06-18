'use strict';

const auth = (function() {
  const status = function(defaultUser) {
    let authenticated = (defaultUser !== 'true');
    let username = xdmp.getCurrentUser();
    let profile = {};
    let options = {};

    return {
      authenticated: authenticated,
      username: authenticated ? username : undefined,
      profile: authenticated ? (profile || {}) : {},
      disallowUpdates: options.disallowUpdates,
      appUsersOnly: options.appUsersOnly,
      appName: options.appName
    };
  };

  const login = function(username, password) {
    if (xdmp.login(username, password)) {
      return {
        authenticated: true,
        username: username
      };
    } else {
      return {
        message: "Invalid username or password"
      }
    }
  };

  const logout = function() {
    xdmp.logout();
  };

  const profile = function(username) {
    return cts.doc('/api/users/' + username + '.json');
  };

  return {
    status: status,
    login: login,
    logout: logout,
    profile: profile
  };
})();

module.exports = auth;
