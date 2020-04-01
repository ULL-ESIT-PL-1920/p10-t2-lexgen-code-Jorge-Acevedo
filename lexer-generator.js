'use strict';
const buildLexer = require('./build-lexer.js');

const str = 'const varName = "value"';
console.log(str);

const SPACE = /(?<SPACE>\s+)/;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const ID = /(?<ID>([a-z_]\w+))/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const OP = /(?<OP>[+*\/=-])/;
const ERROR = /./;

const tokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID], 
  ['STRING', STRING], ['OP', OP], ['ERROR', ERROR] 
];

let lexer = buildLexer(tokens);
console.log(lexer);
lexer(str);

//6ee67e36cf37f1c59cb845deb14f9e7e32096e83