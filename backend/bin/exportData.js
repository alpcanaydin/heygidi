/**
 * Export data from elasticsearch year by year
 */

const fs = require('fs');
const elasticsearch = require('elasticsearch');
const config = require('../config.json');

const esParams = config.elasticsearch;

const client = new elasticsearch.Client({
  host: esParams.host
});

const DATA_FOLDER = `${__dirname}/../../app/src/data`;
const YEARS = [
  2017, 2016, 2015, 2014, 2013, 2012, 2011,
  2010, 2009, 2008, 2007, 2006, 2005, 2004,
  2003, 2002, 2001, 2000, 1999, 1998, 1997
];

const EXCLUDES = [
  'açıklama',
  'yeni',
  'çıktı',
  'dakika',
  'haber',
  'alın',
  'gel',
  'edil',
  'başla',
  'bölüm',
  'günü',
  'özel',
  'düştü',
  'bugün',
  'gece',
  'açıkla'
];

const getData = (year) => {
  const query = {
    range: {
      CreatedDate: {
        gte: year,
        lt: year + 1
      }
    }
  };

  const aggs = {
    wordsCount: {
      terms: {
        field: 'Stems',
        size: 100,
        exclude: EXCLUDES
      }
    }
  };

  const body = Object.assign(
    {},
    year ? { query } : {},
    { aggs }
  );

  return client
    .search({
      index: esParams.index,
      type: esParams.type,
      size: 0,
      body
    })
    .then(response => response.aggregations.wordsCount.buckets.map(bucket => ({
      word: bucket.key,
      count: bucket.doc_count
    })))
  ;
};

const saveToFile = (data, year = 'all') => new Promise((resolve, reject) => {
  fs.writeFile(`${DATA_FOLDER}/${year}.json`, JSON.stringify(data), (err) => {
    if (err) {
      reject(err);
      return;
    }

    resolve();
  });
});

const promises = [];
promises.push(getData().then(data => saveToFile(data)));

YEARS.forEach((year) => {
  const promise = getData(year).then(data => saveToFile(data, year));
  promises.push(promise);
});

Promise
  .all(promises)
  .then(() => console.log('All done!'))
  .catch(err => console.log(err))
;

