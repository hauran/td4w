#!/usr/bin/env node
var fs = require('fs');
var colors = require('colors');

(function() {
  var good = true;
  process.chdir('../../');
  if (fs.existsSync('.git/hooks/pre-commit')) {  //if already a pre-commit
    var precommit = fs.readFileSync('.git/hooks/pre-commit','utf8');
    if(precommit.indexOf('TD4W')==-1) { // if precommit isnt TD4W then continue. otherwise will just overwrite
      if(!fs.existsSync('.git/hooks/pre-commit_bak')) { //check if there is already a pre-commit_bak
       fs.renameSync('.git/hooks/pre-commit', '.git/hooks/pre-commit_bak')  //if not, rename current pre-commit to pre-commit_bak
       fs.chmodSync('.git/hooks/pre-commit_bak', '777');
      }
      else {  // crap already a pre-commit_bak. dont do anything
        console.log('TD4W FAIL! ./git/hook/pre-commit_bak file already exists'.red) 
        good = false;
      }
    }
  }
  if(good) {
    fs.createReadStream('node_modules/td4w/pre-commit').pipe(fs.createWriteStream('.git/hooks/pre-commit'));
    fs.chmodSync('.git/hooks/pre-commit', '777');
  }

}).call(this)