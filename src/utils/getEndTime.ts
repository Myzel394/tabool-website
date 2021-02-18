import defaultTimeSchema from "../constants/defaultTimeSchema";
import {Schema} from "../types";

const getEndTime = (hour: number, schema: Schema = defaultTimeSchema): Date =>
    schema[hour][1];

export default getEndTime;
