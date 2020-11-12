import {IDefaultCalendarManager} from "../DefaultCalendar";
import {useFetchHomeworkListAPI} from "hooks/apis/fetch/homework";

export interface IHomeworkCreatedCalendar extends IDefaultCalendarManager {}


const HomeworkCreatedCalendar = ({activeView, onCalendarTypeChange, onViewChange}: IHomeworkCreatedCalendar) => {
    const {data} = {};
}


export default HomeworkCreatedCalendar;
