// If you want debugging output run it this way:
// DEBUG=1 npm test
const debug = process.env["DEBUG"];
const { inspect } = require('util');
const ins = (x) => { if (debug) console.log(inspect(x, {depth: null})) };

const buildLexer =require('../build-lexer.js');

const SPACE = /(?<SPACE>\s+|\/\/.*)/;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let|var)\b)/;
const ID = /(?<ID>\b([a-z_]\w*))\b/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const OP = /(?<OP>[+*\/=-])/;

const myTokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID],
  ['STRING', STRING], ['OP', OP]
];

let str, lexer, r;
lexer = buildLexer(myTokens);
console.log("lexer en el test: ");
console.log(lexer);


str = 'const varName = "value"';
ins(str);
r = lexer(str);
ins(r);
let expected = [
  { type: 'RESERVEDWORD', value: 'const' },
  { type: 'ID', value: 'varName' },
  { type: 'OP', value: '=' },
  { type: 'STRING', value: '"value"' }
];

test(str, () => {
  expect(r).toEqual(expected);
});

str = 'let x = a + \nb';
ins(str);
r = lexer(str);
expected = [
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'x' },
  { type: 'OP', value: '=' },
  { type: 'ID', value: 'a' },
  { type: 'OP', value: '+' },
  { type: 'ID', value: 'b' }
];
ins(r);
test(str, () => {
  expect(r).toEqual(expected);
});

str = ' // Entrada con errores\nlet x = 42*c';
ins(str);
r = lexer(str);
ins(r);
expected = [
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'x' },
  { type: 'OP', value: '=' },
  { type: 'ERROR', value: '42*c' }
];

test(str, () => {
  expect(r).toEqual(expected);
});

str = 'var abc_ = acb';
ins(str);
r = lexer(str);
ins(r);
expected = [
  { type: 'RESERVEDWORD', value: 'var' },
  { type: 'ID', value: 'abc_' },
  { type: 'OP', value: '=' },
  { type: 'ID', value: 'acb' }
];

test(str, () => {
  expect(r).toEqual(expected);
});

str = 'var abc_ = acb\n let x = y\n const w = z\n // This should not appear';
ins(str);
r = lexer(str);
ins(r);
expected = [
  { type: 'RESERVEDWORD', value: 'var' },
  { type: 'ID', value: 'abc_' },
  { type: 'OP', value: '=' },
  { type: 'ID', value: 'acb' },
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'x' },
  { type: 'OP', value: '=' },
  { type: 'ID', value: 'y' },
  { type: 'RESERVEDWORD', value: 'const' },
  { type: 'ID', value: 'w' },
  { type: 'OP', value: '=' },
  { type: 'ID', value: 'z' }
];

test(str, () => {
  expect(r).toEqual(expected);
});

test("is lexer a function?", () => {
  expect(lexer).toBeInstanceOf(Function);
});

test("is the lexer returing an array?", () => {
  expect(r).toBeInstanceOf(Array);
});

test("is the lexer returning an object array", () => {
  expect(r[0]).toBeInstanceOf(Object);
})