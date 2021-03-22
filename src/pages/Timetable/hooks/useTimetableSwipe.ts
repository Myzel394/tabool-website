import {SwipeableHandlers} from "react-swipeable/src/types";
import {useSwipeable} from "react-swipeable";
import {useWindowSize} from "hooks";
import {Dispatch, SetStateAction} from "react";
import {Dayjs} from "dayjs";

import {ITimetableContext} from "../TimetableContext";

const useTimetableSwipe = (
    view: ITimetableContext["view"],
    update: Dispatch<SetStateAction<Dayjs>>,
): SwipeableHandlers => {
    const [width] = useWindowSize();

    return useSwipeable({
        delta: width * 0.25,
        onSwipedLeft: () => {
            switch (view) {
                case "month":
                    update(prevDate => prevDate.add(1, "month"));
                    break;
                case "work_week":
                    update(prevDate => prevDate.add(1, "week"));
                    break;
                case "day":
                    update(prevDate => {
                        switch (prevDate.day()) {
                            case 5:
                                return prevDate.add(3, "day");
                            default:
                                return prevDate.add(1, "day");
                        }
                    });
                    break;
            }
        },
        onSwipedRight: () => {
            switch (view) {
                case "month":
                    update(prevDate => prevDate.subtract(1, "month"));
                    break;
                case "work_week":
                    update(prevDate => prevDate.subtract(1, "week"));
                    break;
                case "day":
                    update(prevDate => {
                        switch (prevDate.day()) {
                            case 1:
                                return prevDate.subtract(3, "day");
                            default:
                                return prevDate.subtract(1, "day");
                        }
                    });
                    break;
            }
        },
    });
};

export default useTimetableSwipe;
