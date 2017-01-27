/**
 * Data Fetcher from Hurriyet API
 */

const fs = require('fs');
const rp = require('request-promise');
const config = require('../config.json');
const SkipStream = require('./lib/skipStream');

const skipStream = new SkipStream({
  skip: parseInt(process.argv[2] || -50, 10),
  skipLimit: parseInt(process.argv[3] || 1000, 10),
  counter: 50
});

skipStream.on('data', (data) => {
  skipStream.pause();
  const skip = data.toString();

  console.log(`Articles is being fetched for ${skip}`);

  const options = {
    uri: `${config.hurriyet.url}/articles?$filter=Path eq '/gundem/'&$skip=${skip}`,
    headers: { apikey: process.argv[4] || config.hurriyet.key }
  };

  const file = `${__dirname}/../data/${skip}.json`;

  rp(options)
    .then((response) => {
      fs.writeFile(file, response, 'utf-8', () => {
        console.log('Articles has been written to file.');
        skipStream.resume();
      });
    })
    .catch((err) => {
      console.log(err);
      process.exit();
    })
  ;
});
