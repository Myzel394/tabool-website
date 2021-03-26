import {
    FaAndroid,
    FaApple,
    FaBlackTie,
    FaClock,
    FaStickyNote,
    GiCardExchange,
    MdBook,
    MdPeople,
    MdRoom,
    MdSmartphone,
    MdViewAgenda,
    RiFileEditFill,
} from "react-icons/all";
import {isAndroid, isIOS} from "react-device-detect";

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
    } else if (isIOS) {
        return FaApple;
    }

    return MdSmartphone;
})();
