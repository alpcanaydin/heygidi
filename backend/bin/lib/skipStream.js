/**
 * Skip stream
 */

const Readable = require('stream').Readable;

class SkipStream extends Readable {
  constructor(options) {
    super(options);

    this.skip = options.skip;
    this.skipLimit = options.skipLimit;
    this.counter = options.counter;
  }

  _read() {
    if (this.skip >= this.skipLimit) {
      this.push(null);
      return;
    }

    this.skip += this.counter;
    this.push(Buffer.from(`${this.skip}`));
  }
}

module.exports = SkipStream;
