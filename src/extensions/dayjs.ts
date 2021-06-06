import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("de");
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
