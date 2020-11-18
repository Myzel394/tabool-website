import React, {memo} from "react";
import {EventDetail} from "types";

import styles from "./EventEvent.module.scss";

export interface IEventEvent {
    event: EventDetail;
}

const EventEvent = ({event}: IEventEvent) => {
    return (
        <div className={styles.wrapper}>
            {event.title}
        </div>
    );
};

export default memo(EventEvent);
