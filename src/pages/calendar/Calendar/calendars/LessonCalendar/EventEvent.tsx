import React, {memo} from "react";
import {EventDetail} from "types";

export interface IEventEvent {
    event: EventDetail;
}

const EventEvent = ({event}: IEventEvent) => {
    return (
        <div>
            {event.title}
        </div>
    );
};

export default memo(EventEvent);
