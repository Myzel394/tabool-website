import React from "react";
import renderer from "react-test-renderer";

import "i18n";

import BackButton from "./index";

test("BackButton snapshots", () => {
    const component = renderer.create(<BackButton />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

