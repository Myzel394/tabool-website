import {
    FaAndroid,
    FaApple,
    FaBlackTie,
    FaClock,
    FaLinux,
    FaStickyNote,
    FaWindows,
    GiCardExchange,
    MdBook,
    MdPeople,
    MdRoom,
    MdSmartphone,
    MdViewAgenda,
    RiFileEditFill,
} from "react-icons/all";
import {isAndroid, isIOS, isMacOs, isMobile, isWindows} from "react-device-detect";

export const CourseIcon = MdPeople;
export const LessonIcon = FaClock;
export const SubjectIcon = MdBook;
export const TeacherIcon = FaBlackTie;
export const HomeworkIcon = FaStickyNote;
export const ExamIcon = RiFileEditFill;
export const RoomIcon = MdRoom;
export const TimetableIcon = MdViewAgenda;
export const ModificationIcon = GiCardExchange;
export const CurrentDeviceOSIcon = (() => {
    if (isAndroid) {
        return FaAndroid;
    } else if (isIOS || isMacOs) {
        return FaApple;
    } else if (isWindows) {
        return FaWindows;
    } else if (isMobile) {
        return MdSmartphone;
    } else {
        return FaLinux;
    }
})();
