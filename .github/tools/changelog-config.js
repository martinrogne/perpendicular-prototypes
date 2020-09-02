'use strict'
const config = require('conventional-changelog-angular');

config.then(x => {
  console.log('then: ', x);
});

module.exports = config;
