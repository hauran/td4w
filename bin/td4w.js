#!/usr/bin/env node
var fs = require('fs');

(function() {
  fs.createReadStream('pre-commit').pipe(fs.createWriteStream('../../.git/hooks/pre-commit'));
  fs.chmodSync('../../.git/hooks/pre-commit', '777');
}).call(this)