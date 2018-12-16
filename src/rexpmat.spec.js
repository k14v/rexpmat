import test from 'ava';
import rexpmat from '../src/rexpmat';


Object.entries({
  'Characters: a A ': [
    'Characters: %c %c ', 'a', 'A',
  ],
  'Decimals: 1977 650000': [
    'Decimals: %d %ld', '1977', '650000',
  ],
  'Preceding with blanks:       1977 ': [
    'Preceding with blanks: %10d ', '1977',
  ],
  'Preceding with zeros: 0000001977 ': [
    'Preceding with zeros: %010d ', '1977',
  ],
  'Some different radices: 100 64 144 0x64 0144 ': [
    'Some different radices: %d %x %o %#x %#o ', '100', '64', '144', '64', '144',
  ],
  'floats: 3.14 +3e+000 3.141600E+000 ': [
    'floats: %4.2f %+.0e %E ', '3.14', '3e+000', '3.141600E+000',
  ],
  'Width trick:    10 ': [
    'Width trick: %*d ', '10',
  ],
  'A string ': [
    '%s ', 'A string',
  ],
}).forEach((spec) => {
  test(`should create regexp using the format string "${spec[1][0]}"`, (t) => {
    const regexp = rexpmat(spec[1][0]);
    t.deepEqual((regexp.exec(spec[0]) || []).slice(1), spec[1].slice(1));
    t.pass();
  });
});
