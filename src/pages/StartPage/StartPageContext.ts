import {DailyData} from "types";
import {createContext, Dispatch, SetStateAction} from "react";
import {Dayjs} from "dayjs";

export interface IStartPageContext {
    dailyData: DailyData;
    setDailyData: Dispatch<SetStateAction<DailyData>>;

    targetedDate: Dayjs;
    setTargetedDate: (newData: Dayjs) => void;

    maxFutureDays: number;
    setMaxFutureDays: (newData: number) => void;

    isLoading: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const StartPageContext = createContext<IStartPageContext>();

export default StartPageContext;
