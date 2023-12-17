// Types
import { TokenSpecifier } from '@k14v/printf-tokenize';


export interface RegexpSpecifierMapOptions {
  decimalSeparator: string,
}

export function createRegexpSpecifierMap (options?: RegexpSpecifierMapOptions) {
  const { decimalSeparator: ds = '.' } = options || {};
  return ({
    [TokenSpecifier.Hexadecimal]: '[0-9a-f]+',
    [TokenSpecifier.HexadecimalUpper]: '[0-9A-F]+',
    [TokenSpecifier.Scientific]: `\\d+(\\${ds}\\d+)?e\\+0+`,
    [TokenSpecifier.ScientificUpper]: `\\d+(\\${ds}\\d+)?E\\+0+`,
    [TokenSpecifier.Character]: '[\\w\\W]',
    [TokenSpecifier.String]: '[\\w\\W]+',
    [TokenSpecifier.Octal]: '[0-7]+',
    [TokenSpecifier.Digit]: `\\d+(\\${ds}\\d+)?`,
    [TokenSpecifier.Integer]: `\\d+`,
    [TokenSpecifier.Float]: `\\d+\\${ds}\\d+`,
  });
}

const MATCH_OPERATOR_REGEX = /[|^.\\{}()[\]$?]/g;

export function escapeStringRegexp(str: string) {
  return str.replace(MATCH_OPERATOR_REGEX, '\\$&');
}

export function removeEscapedPercent(str: string, strict?: boolean){
  return (strict ? str.replace(/(%{3}(?!%))/g, '%%') : str).replace(/%%/g, '%');
}