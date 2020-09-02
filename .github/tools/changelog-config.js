'use strict'
const config = require('conventional-changelog-angular');

module.exports = config.all([conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts])
  .spread((conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts) => {

    console.log('c: ', conventionalChangelog);
    console.log('parser: ', parserOpts);
    console.log('bump: ', recommendedBumpOpts);
    console.log('writer: ', writerOpts);


    return { conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts }
  });
