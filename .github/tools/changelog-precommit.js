exports.preCommit = (props) => {
  console.log('Precommit ENTER');

  console.log('Precommit props: ', props);

  const environment = require('../../projects/demo/src/environments/environment.prod.ts');
  environment.environment.version = '0.0.0';

  const fs = require('fs');
  const fileName = '../../projects/demo/src/environments/environment.generated.ts';

  fs.writeFile(fileName, 'foo', function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(file));
    console.log('writing to ' + fileName);
  });

  console.log('Precommit EXIT');
}
