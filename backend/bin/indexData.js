/**
 * Send data to elasticsearch
 */

const fs = require('fs');
const elasticsearch = require('elasticsearch');
const config = require('../config.json');
const SkipStream = require('./lib/skipStream');
const Stemmer = require('./lib/stemmer');

const esParams = config.elasticsearch;

const stemmer = new Stemmer();

const client = new elasticsearch.Client({
  host: esParams.host
});

const skipStream = new SkipStream({
  skip: parseInt(process.argv[2] || -50, 10),
  skipLimit: parseInt(process.argv[3] || 100, 10),
  counter: 50
});

skipStream.on('data', (data) => {
  skipStream.pause();
  const fileName = `${data.toString()}.json`;
  const filePath = `${__dirname}/../data/${fileName}`;

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log(`An error occured while reading ${fileName}, skipping...`);
      skipStream.resume();
      return;
    }

    const docs = JSON.parse(content.toString());
    const body = [];
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      doc.Stems = stemmer.getStemsFromSentence(doc.Title);

      body.push(
        {
          index: {
            _index: esParams.index,
            _type: esParams.type,
            _id: doc.Id
          }
        }
      );
      body.push(doc);
    }

    client
      .bulk({ body })
      .then(() => {
        console.log(`${fileName} has been indexed.`);
        skipStream.resume();
      })
      .catch((esError) => {
        console.log(`An error occured while indexing ${fileName}, skipping...`);
        console.log(esError.message);
        skipStream.resume();
      })
    ;
  });
});
