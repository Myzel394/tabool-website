import parseErrors from "./parseErrors";

describe("parseErrors", () => {
    it("work with array (no non-field errors)", () => {
        const data = {
            dueDate: ["a", "b"],
            text: ["a"],
        };

        const expected = {
            dueDate: ["a", "b"],
            text: ["a"],
        };
        const actual = parseErrors(data);

        expect(expected).toMatchObject(actual);
    });

    it("work with strings (no non-field errors)", () => {
        const data = {
            dueDate: ["a", "b"],
            text: "a",
        };

        const expected = {
            dueDate: ["a", "b"],
            text: ["a"],
        };
        const actual = parseErrors(data);

        expect(expected).toMatchObject(actual);
    });

    it("work with strings and non-field errors", () => {
        const data = {
            dueDate: ["a", "b"],
            text: "a",
            nonFieldErrors: ["a"],
            detail: "b",
        };

        const expected = {
            dueDate: ["a", "b"],
            text: ["a"],
            nonFieldErrors: ["a", "b"],
        };
        const actual = parseErrors(data);

        expect(expected).toMatchObject(actual);
    });
});
