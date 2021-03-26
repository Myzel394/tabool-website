import fetchIdsToObject from "../fetchIdsToObject";

describe("fetchIdsToObject works as expected", () => {
    const element = {
        adam: "boy",
        bernd: "boy",
        charlotte: "girl",
    };

    test("with all keys", async () => {
        const funcMap = {
            adam: () => 123,
            bernd: () => 456,
            charlotte: () => 789,
        };
        const expectedResult = {
            adam: 123,
            bernd: 456,
            charlotte: 789,
        };

        const result = await fetchIdsToObject(element, funcMap);

        expect(result).toEqual(expectedResult);
    });

    test("with some keys", async () => {
        const funcMap = {
            adam: () => 123,
        };
        const expectedResult = {
            adam: 123,
            bernd: "boy",
            charlotte: "girl",
        };

        const result = await fetchIdsToObject(element, funcMap);

        expect(result).toEqual(expectedResult);
    });
});

