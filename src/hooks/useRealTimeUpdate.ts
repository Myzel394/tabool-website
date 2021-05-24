import {useEffect, useState} from "react";

const useRealTimeUpdate = (updateFrequency = 10 * 1000): Date => {
    const [now, setNow] = useState<Date>(new Date());

    useEffect(() => {
        const $interval = setInterval(() => {
            setNow(new Date());
        }, updateFrequency);

        return () => clearInterval($interval);
    }, [updateFrequency]);

    return now;
};

export default useRealTimeUpdate;

