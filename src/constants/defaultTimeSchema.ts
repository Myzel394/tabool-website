import {Schema} from "../types";

const createTime = (hour: number, minute: number): Date =>
    new Date(1, 1, 1, hour, minute, 0, 0);

const defaultSchema: Schema = {
    1: [createTime(8, 0), createTime(8, 45)],
    2: [createTime(8, 45), createTime(9, 30)],

    3: [createTime(9, 50), createTime(10, 35)],
    4: [createTime(10, 35), createTime(11, 20)],

    5: [createTime(11, 40), createTime(12, 25)],
    6: [createTime(12, 25), createTime(13, 10)],


    7: [createTime(14, 0), createTime(14, 45)],
    8: [createTime(14, 45), createTime(15, 30)],
    9: [createTime(15, 30), createTime(16, 15)],
    10: [createTime(16, 15), createTime(17, 0)],

    11: [createTime(17, 0), createTime(17, 45)],
};

export default defaultSchema;
