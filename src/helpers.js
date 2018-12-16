export const createRegexpSpecifierMap = ({
  decimalSeparator: ds,
} = {
  decimalSeparator: '.',
}) => ({
  'x': '[0-9a-f]+',
  'X': '[0-9A-F]+',
  'e': `\\d+e\\+0+|\\d\\${ds}\\d+e\\+0+`,
  'E': `\\d+E\\+0+|\\d\\${ds}\\d+E\\+0+`,
  'c': '[\\w\\W]',
  's': '[\\w\\W]+',
  'o': '\\d+',
  'd': `\\d+|\\d+\\${ds}\\d+`,
  'i': `\\d+|\\d+\\${ds}\\d+`,
  'f': `\\d+\\${ds}\\d+`,
});

export const matchOperatorsRe = /[|^.\\{}()[\]$?]/g;

export const escapeStringRegexp = str => str.replace(matchOperatorsRe, '\\$&');
