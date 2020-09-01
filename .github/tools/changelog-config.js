'use strict'
const config = require('conventional-changelog-angular');

module.exports = config({
  "issuePrefixes": ["TN-"],
  "issueUrlFormat": "https://jira.example.com/browse/{{prefix}}{{id}}"
})
