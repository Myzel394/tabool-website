import defaultTimeSchema from "../constants/defaultTimeSchema";
import {Schema} from "../types";

const getStartTime = (hour: number, schema: Schema = defaultTimeSchema): Date =>
    schema[hour][0];

export default getStartTime;
