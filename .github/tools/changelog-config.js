'use strict'
const config = require('conventional-changelog-angular');

config.then(x => {
  x.recommendedBumpOpts.whatBump = (commits) => {

    // custom - we consider everything to be a patch
    return {
      level: 2,
      reason: 'static'
    }
  }
});

module.exports = config;
