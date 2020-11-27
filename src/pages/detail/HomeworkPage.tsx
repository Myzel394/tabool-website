import React from "react";
import {useQuery} from "react-query";
import {useFetchHomeworkDetailAPI} from "hooks";
import {DetailPage, LoadingIndicator} from "components";
import {useTranslation} from "react-i18next";
import {
    BiBarChartSquare,
    FaClock,
    FaHourglassEnd,
    FaHourglassHalf,
    FaHourglassStart,
    FaInfoCircle,
    FaRegHourglass,
    FaTable,
} from "react-icons/all";
import dayjs, {Dayjs} from "dayjs";

import {formatLesson} from "../../format";

const getDueDateIcon = (dueDate: Dayjs, ignore: boolean): JSX.Element => {
    // Ignore guard
    if (ignore) {
        return <FaRegHourglass />;
    }

    const today = dayjs();
    const diff = today.diff(dueDate, "day");

    if (diff < 0) {
        return <FaHourglassEnd />;
    } else if (diff > 7) {
        return <FaHourglassStart />;
    } else {
        return <FaHourglassHalf />;
    }
};

const HomeworkPage = ({match: {params: {id}}}) => {
    const {t} = useTranslation();
    const fetchHomework = useFetchHomeworkDetailAPI();
    const {data, isLoading, isError} = useQuery(id, fetchHomework);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (isError || !data) {
        return null;
    }

    return (
        <DetailPage
            title={data.lesson.lessonData.course.subject.name}
            color={data.lesson.lessonData.course.subject.userRelation.color}
            defaultOrdering={[
                "information", "dueDate", "createdAt", "type", "lesson",
            ]}
            data={{
                information: {
                    icon: <FaInfoCircle />,
                    title: t("Information"),
                    information: data.information,
                },
                dueDate: {
                    icon: getDueDateIcon(data.dueDate, data.userRelation.ignore || data.userRelation.completed),
                    title: t("Fälligkeitsdatum"),
                    information: data.dueDate.format("L"),
                },
                createdAt: {
                    icon: <FaClock />,
                    title: t("Einstellungsdatum"),
                    information: data.createdAt.format("LT"),
                },
                type: {
                    icon: <BiBarChartSquare />,
                    title: t("Typ"),
                    information: data.type,
                },
                lesson: {
                    icon: <FaTable />,
                    title: t("Stunde"),
                    information: formatLesson(data.lesson),
                },
            }}
            orderingStorageName="detail:ordering:homework_detail"
        />
    );
};

export default HomeworkPage;
