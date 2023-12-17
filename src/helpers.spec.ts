// Core
import test from 'ava';
import {
    createRegexpSpecifierMap,
    escapeStringRegexp,
    removeEscapedPercent
} from './helpers.ts';
// Types
import { TokenSpecifier } from '@k14v/printf-tokenize';


test('the function createRegexpSpecifierMap should return a regex as a string for each TokenSpecifier', (t) => {
    const regexpForEachTokenSpecifier = createRegexpSpecifierMap();

    function execRegexFromString(tokenSpecifier: TokenSpecifier, str: string): boolean{
        return new RegExp(`^${regexpForEachTokenSpecifier[tokenSpecifier]}$`).test(str);
    }

    t.is(execRegexFromString(TokenSpecifier.Hexadecimal, '123abc'), true);
    t.is(execRegexFromString(TokenSpecifier.Hexadecimal, '123ap'), false);
    t.is(execRegexFromString(TokenSpecifier.HexadecimalUpper, '123ABC'), true);
    t.is(execRegexFromString(TokenSpecifier.HexadecimalUpper, '123AP'), false);
    t.is(execRegexFromString(TokenSpecifier.Scientific, '3458475e+000'), true);
    t.is(execRegexFromString(TokenSpecifier.Scientific, '34584.75e+000'), true);
    t.is(execRegexFromString(TokenSpecifier.Scientific, '3458475b000'), false);
    t.is(execRegexFromString(TokenSpecifier.ScientificUpper, '3458475E+000'), true);
    t.is(execRegexFromString(TokenSpecifier.ScientificUpper, '34584.75E+000'), true);
    t.is(execRegexFromString(TokenSpecifier.ScientificUpper, '3458475B000'), false);
    t.is(execRegexFromString(TokenSpecifier.Character, 'a'), true);
    t.is(execRegexFromString(TokenSpecifier.Character, 'B'), true);
    t.is(execRegexFromString(TokenSpecifier.Character, '1'), true);
    t.is(execRegexFromString(TokenSpecifier.Character, '['), true);
    t.is(execRegexFromString(TokenSpecifier.Character, 'tt'), false);
    t.is(execRegexFromString(TokenSpecifier.String, 'aBc'), true);
    t.is(execRegexFromString(TokenSpecifier.String, '234'), true);
    t.is(execRegexFromString(TokenSpecifier.String, '[g+'), true);
    t.is(execRegexFromString(TokenSpecifier.String, 'd'), true);
    t.is(execRegexFromString(TokenSpecifier.Octal, '0'), true);
    t.is(execRegexFromString(TokenSpecifier.Octal, '8'), false);
    t.is(execRegexFromString(TokenSpecifier.Digit, '14654'), true);
    t.is(execRegexFromString(TokenSpecifier.Digit, '14654.55'), true);
    t.is(execRegexFromString(TokenSpecifier.Digit, '14654a13'), false);
    t.is(execRegexFromString(TokenSpecifier.Digit, '14654.55a123'), false);
    t.is(execRegexFromString(TokenSpecifier.Integer, '1'), true);
    t.is(execRegexFromString(TokenSpecifier.Integer, '146'), true);
    t.is(execRegexFromString(TokenSpecifier.Integer, '14654.55'), false);
    t.is(execRegexFromString(TokenSpecifier.Integer, 'a'), false);
    t.is(execRegexFromString(TokenSpecifier.Float, '1.1'), true);
    t.is(execRegexFromString(TokenSpecifier.Float, '134.33'), true);
    t.is(execRegexFromString(TokenSpecifier.Float, '123'), false);
    t.is(execRegexFromString(TokenSpecifier.Float, 'a'), false);
})

test('the function escapeStringRegexp should replace the symbols [|^.\\\\{}()[\]$?] for the symbol escaped', (t) => {
    t.is(escapeStringRegexp('['), '\\[');
    t.is(escapeStringRegexp('|'), '\\|');
    t.is(escapeStringRegexp('^'), '\\^');
    t.is(escapeStringRegexp('.'), '\\.');
    t.is(escapeStringRegexp('\\'), '\\\\');
    t.is(escapeStringRegexp('{'), '\\{');
    t.is(escapeStringRegexp('}'), '\\}');
    t.is(escapeStringRegexp('('), '\\(');
    t.is(escapeStringRegexp(')'), '\\)');
    t.is(escapeStringRegexp('['), '\\[');
    t.is(escapeStringRegexp(']'), '\\]');
    t.is(escapeStringRegexp('$'), '\\$');
    t.is(escapeStringRegexp('?'), '\\?');
})

test('the function removeEscapedPercent should replace two percent symbols for just one percent symbol', (t) => {
    t.is(removeEscapedPercent('%%'), '%');
    t.is(removeEscapedPercent('%%%'), '%%');
})

test('the function removeEscapedPercent should replace three percent symbols for just one percent symbol if the strict flag is true', (t) => {
    t.is(removeEscapedPercent('%%%', true), '%');
})

test('the function removeEscapedPercent should NOT replace four percent symbols for just one percent symbol if the strict flag is true', (t) => {
    t.is(removeEscapedPercent('%%%%', true), '%%');
})