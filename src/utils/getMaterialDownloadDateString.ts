import dayjs from "dayjs";

import lazyDatetime from "./lazyDatetime";

const getMaterialDownloadDateString = (t, publishDatetime): string => {
    const isToday = lazyDatetime(dayjs(), "date") === lazyDatetime(publishDatetime, "date");
    const dateFormatted = isToday
        ? t("{{time}} Uhr", {time: publishDatetime.format("LT")})
        : publishDatetime.format("lll");

    return t("Verfügbar ab {{date}}", {
        date: dateFormatted,
    });
};

export default getMaterialDownloadDateString;
