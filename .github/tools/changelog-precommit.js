exports.preCommit = (props) => {
  console.log('Precommit ENTER');

  console.log('Precommit props: ', props);

  const fs = require('fs');
  const fileName = './environment.generated.ts';

  fs.writeFile(fileName, 'foo', function write(err) {
    if (err) return console.log(err);
    console.log('writing to ' + fileName);
  });

  console.log('Precommit EXIT');
}
