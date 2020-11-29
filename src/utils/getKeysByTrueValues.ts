import _ from "lodash";

const getKeysByTrueValues = (value) =>
    _.keys(
        _.pickBy(value),
    );

export default getKeysByTrueValues;
