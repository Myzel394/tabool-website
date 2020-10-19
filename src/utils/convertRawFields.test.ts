import convertRawFields from "./convertRawFields";
import "react-app-polyfill/stable";

test("convertRawFields converts correctly", () => {
    const data = {
        email: {
            type: "email",
            required: true,
            read_only: false,
            label: "Email",
        },
        token: {
            type: "string",
            required: true,
            read_only: false,
            label: "Token",
            min_length: 127,
            max_length: 127,
        },
    };
    const expected = {
        email: {
            type: "email",
            required: true,
            readOnly: false,
            label: "Email",
        },
        token: {
            type: "string",
            required: true,
            readOnly: false,
            label: "Token",
            minLength: 127,
            maxLength: 127,
        },
    };

    const actual = convertRawFields(data);

    expect(actual).toEqual(expected);
});


