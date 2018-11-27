'use strict';

import { dayBefore } from '../src/utils';
import { assert } from 'chai';

suite('dayBefore', () => {

    // Defines a Mocha unit test
    test('Start of epoch', () => {
        const date = new Date(1971, 1, 2, 3, 4, 5);
        const expected = new Date(1971, 1, 1, 3, 4, 5);

        const actual = dayBefore(date);
        assert.equal(actual.getTime(), expected.getTime());
    });
});
