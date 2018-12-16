import printfTokenize, { TOKEN_TYPES } from '@k14v/printf-tokenize';
import { createRegexpSpecifierMap, escapeStringRegexp } from './helpers';


export default (str, opts) => {
  const regexpSpecifierMap = createRegexpSpecifierMap(opts);
  return new RegExp(printfTokenize(str).map((token) => {
    if (token.type === TOKEN_TYPES.PARAMETER) {
      const regexpMap = regexpSpecifierMap[token.specifier];
      if (!regexpMap) {
        throw new Error(`Unexpected specifier ${token.specifier}`);
      }
      let prefix = '';
      let scope = regexpMap;

      // Left Padding
      if (token.width) {
        prefix += `${token.flags || '\\s'}*`;
      }

      if (token.flags === '#') {
        if (token.specifier === 'o') {
          prefix += `0*`;
        } else {
          prefix += `0${token.case === 'lower' ? 'x' : 'X'}`;
        }
      }

      if (token.flags === '+') {
        prefix += '\\+';
      }

      if (token.width === '*') {
        prefix += '\\s*';
      }

      return `${prefix}(${scope})`;
    }
    return escapeStringRegexp(token.value);
  }).join(''), 'gm');
};
