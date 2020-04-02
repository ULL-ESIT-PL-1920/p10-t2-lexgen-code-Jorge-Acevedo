# lexer-generator
## Descritpion
This is a little module developed at the subject ***Procesadores de Lenguajes*** , taken at *ULL*. 
We have had the guidance of Casiano Rodriguez de León as our professor.
## The module
This module exports a function (`makeLexer`) which receives an array of pairs of the form:
```js
const languageDescriptionTokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID],
  ['STRING', STRING], ['OP', OP]
];
```
In which the first element is the token identifier and the second is the regular expression associated, so for example, `SPACE` would something like:
```js
const SPACE = /(?<SPACE>\s+|\/\/.*)/;
```
Given that input, the module will return a function, capable of recognizing this tokens at a given string.
## Installation
#### Install from the command line:

`$  npm install @ull-esit-pl-1920/p10-t2-lexgen-code-jorge-acevedo@1.0.1`

#### Install via package.json:

`"@ull-esit-pl-1920/p10-t2-lexgen-code-jorge-acevedo": "1.0.1"`

## Example
With a simple main script like the one below this text:
```js 
'use strict';
const  buildLexer  =require('@ULL-ESIT-PL-1920/p10-t2-lexgen-code-jorge-acevedo');
const str = 'const varName = "value"\n let string = "This a test"';
console.log(str);

const SPACE = /(?<SPACE>\s+)/;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const ID = /(?<ID>([a-z_]\w+))/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const OP = /(?<OP>[+*\/=-])/;
const ERROR = /./;

const tokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID], 
  ['STRING', STRING], ['OP', OP]
];

let lexer = buildLexer(tokens);
console.log(lexer(str));
```
You may expect an output very similar to:
```js
[
  { type: 'RESERVEDWORD', value: 'const' },
  { type: 'ID', value: 'varName' },
  { type: 'OP', value: '=' },
  { type: 'STRING', value: '"value"' },
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'string' },
  { type: 'OP', value: '=' },
  { type: 'STRING', value: '"This a test"' }
]
```