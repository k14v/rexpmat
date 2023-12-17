// Utils
import printfTokenize, { TokenKind } from '@k14v/printf-tokenize';
import {
  createRegexpSpecifierMap,
  escapeStringRegexp,
  removeEscapedPercent,
  RegexpSpecifierMapOptions,
} from './helpers.ts';


function rexpmat(str: string, options?: RegexpSpecifierMapOptions){
  const regexpSpecifierMap = createRegexpSpecifierMap(options);
  return new RegExp(printfTokenize(str).map((token) => {
    if (token.kind === TokenKind.Parameter) {
      if(!token.specifier){
        throw new Error(`Unexpected specifier ${token.specifier}`);
      }
      const regexpMap = regexpSpecifierMap[token.specifier];
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
    return removeEscapedPercent(escapeStringRegexp(token.value));
  }).join(''), 'gm');
}

export default rexpmat;