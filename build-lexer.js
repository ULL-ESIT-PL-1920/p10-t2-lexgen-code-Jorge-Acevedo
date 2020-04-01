module.exports = function (tokens) {
  const tokenNames = tokens.map(t => {
    if (t[0] != 'ERROR') {
      return t[0];
    } else {
      throw 'Error: No se puede usar ERROR como palabra reservada';
    }
  });
  const tokenRegs = tokens.map(t => t[1]);

  const buildOrRegexp = (regexps) => {
    const sources = regexps.map(r => r.source);
    const union = sources.join('|');
    // console.log(union);
    return new RegExp(union, 'y');
  };

  const regexp = buildOrRegexp(tokenRegs);
  const getToken = (m) => tokenNames.find(tn => typeof m[tn] !== 'undefined');

  return function(string) {
    let match;
    let result = [];
    let matchLength = 0;
    while (match = regexp.exec(string)) {
      // console.log(match.groups);
      
      let t = getToken(match.groups);
      matchLength += match.groups[t].length;
      if( t != 'SPACE' && t != 'COMMENT'){
        result.push({type: t, value: match.groups[t]});
        
      }
    }
    if(matchLength != string.length){
      result.push({type: 'ERROR', value: string.slice(matchLength, string.length)})
    }
    return result;
  }
}