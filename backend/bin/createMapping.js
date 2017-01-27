/**
 * Create mappings in Elasticsearch
 */

const elasticsearch = require('elasticsearch');
const config = require('../config.json');

const esParams = config.elasticsearch;

const client = new elasticsearch.Client({
  host: esParams.host
});

const body = {
  settings: {
    analysis: {
      analyzer: {
        stem_analyzer: {
          tokenizer: 'standard',
          filter: [
            'turkish_stop'
          ]
        }
      },
      filter: {
        turkish_stop: {
          type: 'stop',
          stopwords_path: esParams.stopWordsPath
        }
      }
    }
  },
  mappings: {
    [esParams.type]: {
      properties: {
        Id: { type: 'integer' },
        ContentType: { type: 'string' },
        CreatedDate: { type: 'date' },
        Title: {
          type: 'text',
          index: 'not_analyzed'
        },
        Description: {
          type: 'text',
          index: 'not_analyzed'
        },
        Stems: {
          type: 'string',
          fielddata: true,
          analyzer: 'stem_analyzer'
        },
        Fields: { type: 'nested' },
        ModifiedDate: { type: 'date' },
        Path: { type: 'string' },
        StartDate: { type: 'date' },
        Url: { type: 'string' }
      }
    }
  }
};

client.indices.exists({ index: esParams.index })
  .then((isExists) => {
    if (isExists) {
      return client.indices.delete({ index: esParams.index });
    }

    return null;
  })
  .then(() => client.indices.create({
    index: esParams.index,
    body
  }))
  .then(() => {
    console.log('All done!');
  })
  .catch((err) => {
    console.log(err);
  })
;
