/* eslint-disable line-comment-position */

import convertToLocalWeekday from "./convertToLocalWeekday";

describe("convertToLocalWeekday", () => {
    it("works as expected", () => {
        const days = [
            [0, 1], // Monday
            [1, 2], // Tuesday
            [6, 0], // Sunday
        ];

        for (const [value, expected] of days) {
            const actual = convertToLocalWeekday(value);

            // eslint-disable-next-line no-console
            console.log(`Testing ${value} -> ${expected}`);
            expect(actual).toEqual(expected);
        }
    });
});
