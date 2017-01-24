const java = require('java');

java.classpath.push(`${__dirname}/../../jar/guava-19.0.jar`);
java.classpath.push(`${__dirname}/../../jar/zemberek-all-0.10.0.jar`);

const TurkishMorphology = java.import('zemberek.morphology.analysis.tr.TurkishMorphology');

class Stemmer {
  constructor() {
    this.morphology = TurkishMorphology.createWithDefaultsSync();
  }

  getStemsFromSentence(sentence) {
    const words = sentence
      .split(' ')
      .map((word) => {
        let analysisWord = word;

        if (/^[a-zA-Z0-9şŞıİçÇöÖüÜĞğ]+'/.test(word)) {
          analysisWord = word.split('\'')[0];
        }

        return analysisWord.replace(/[^a-zA-Z0-9şŞıİçÇöÖüÜĞğ]/g, '');
      })
      .filter(word => word.length > 1)
    ;

    const stems = [];
    for (const word of words) {
      const stem = this.getStem(word);

      if (stem) {
        stems.push(stem);
      }
    }

    return stems;
  }

  getStem(word) {
    const results = this.morphology.analyzeSync(word);
    const size = results.sizeSync();

    if (size === 0) {
      return null;
    }

    let result = '';

    for (let i = 0; i < size; i++) {
      const analysis = results.getSync(i);
      const stems = analysis.getStemsSync();

      if (stems.sizeSync() > 1) {
        result = stems.getSync(stems.sizeSync() - 1);
        break;
      }

      const stem = stems.getSync(0);

      if (stem.length > result.length) {
        result = stem;
      }
    }

    return result;
  }
}

module.exports = Stemmer;
