exports.preCommit = (props) => {
  console.log('Precommit ENTER');

  console.log('Precommit props: ', props);

  const environment = require('../../projects/demo/src/environments/environment.prod');
  environment.environment.version = '0.0.0';

  console.log('Precommit EXIT');
}
