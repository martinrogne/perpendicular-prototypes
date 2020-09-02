'use strict'
const config = require('conventional-changelog-conventionalcommits');

const f = config({});

console.log('config: ', f);

module.exports = f;
