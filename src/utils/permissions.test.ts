import { describe, expect, it } from 'vitest';
import {
    checkActoinVal,
    expandCombinedActionVal,
    genCombinedActionVal,
} from './permmissions';

describe('Testing Permmision Utils', () => {
    it('Generate a combined value for list of permmissions based on permmissions name', () => {
        const resultVal = (BigInt('2') | BigInt('4')).toString(); // "6"
        expect(genCombinedActionVal(['commandX', 'commandY'])).toBe(resultVal);
    });

    it('Return list of permissions name for given permmissions combined value', () => {
        expect(
            expandCombinedActionVal(
                genCombinedActionVal(['commandX', 'commandY']),
            ),
        ).toStrictEqual(['commandX', 'commandY']);

        expect(
            expandCombinedActionVal(genCombinedActionVal(['commandX'])),
        ).toStrictEqual(['commandX']);

        expect(expandCombinedActionVal(genCombinedActionVal([]))).toStrictEqual(
            [],
        );
    });

    it('Verify if permission combined value has specific permmision', () => {
        expect(checkActoinVal('6', '2')).toBe(true);
        expect(checkActoinVal('6', '4')).toBe(true);
        expect(checkActoinVal('6', '32')).toBe(false);
    });
});
