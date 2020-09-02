'use strict'
const config = require('conventional-changelog-angular');

config.then(x => {
  console.log('resolved: ', x);

  x.recommendedBumpOpts.whatBump = (commits) => {
    console.log('whatBumpOverride');

    return {
      level: 2,
      reason: 'static'
    }
  }
});

module.exports = config;
