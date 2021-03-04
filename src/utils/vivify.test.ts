import vivify from "./vivify";

describe("autovivification", () => {
    const expected = {
        outer: {
            inner: {
                value: 5,
            },
        },
    };

    it("works with initialState", () => {
        const obj = vivify();

        obj.outer.inner.value = 5;

        expect(obj).toMatchObject(expected);
    });

    it("works with custom initialState and object", () => {
        const obj = vivify({
            outer: {},
        });

        obj.outer.inner.value = 5;

        expect(obj).toMatchObject(expected);
    });

    it("works with custom initialState and undefined", () => {
        const obj = vivify({
            outer: undefined,
        });

        obj.outer.inner.value = 5;

        expect(obj).toMatchObject(expected);
    });

    it("doesn't work with null in initialState", () => {
        const obj = vivify({
            outer: null,
        });

        expect(() => {
            obj.outer.inner.value = 5;
        }).toThrow(TypeError);
    });

    it("doesn't work with number in initialState", () => {
        const obj = vivify({
            outer: 6,
        });

        expect(() => {
            obj.outer.inner.value = 5;
        }).toThrow(TypeError);
    });
});
