import {MutableRefObject, useCallback, useState} from "react";
import {TeacherLessonDetail} from "types";

export interface IUseRequestLesson {
    onLessonSelectRef: MutableRefObject<((lesson: TeacherLessonDetail) => any)>;
    onLessonAbortRef: MutableRefObject<() => any>;
    oldScrollPositionRef: MutableRefObject<number>;
}

export interface IUseRequestLessonResult {
    requestLesson: () => Promise<TeacherLessonDetail>;
    selectedLesson: TeacherLessonDetail | null;
    isLessonSelectMode: boolean;
    scrollBack: () => any;
}

const scroll = (top: number, left: number): Promise<void> => new Promise(resolve => {
    const checkIsScrollFinished = setInterval(() => {
        const scrollTopAmount = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const scrollLeftAmount = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

        if (scrollTopAmount === top && scrollLeftAmount === left) {
            // Cleanup
            clearInterval(checkIsScrollFinished);
            // Callback
            resolve();
        }
    }, 25);

    window.scrollTo({
        top,
        left,
        behavior: "smooth",
    });
});

const useRequestLesson = ({
    onLessonAbortRef,
    onLessonSelectRef,
    oldScrollPositionRef,
}: IUseRequestLesson): IUseRequestLessonResult => {
    const [selectedLesson, setSelectedLesson] = useState<TeacherLessonDetail | null>(null);
    const [isLessonSelectMode, _setIsLessonSelectMode] = useState<boolean>(false);

    // Ensures `selectedLesson` is correctly cleared
    const setIsLessonSelectMode = useCallback((isLessonSelectMode: boolean) => {
        if (!isLessonSelectMode) {
            setSelectedLesson(null);
        }

        _setIsLessonSelectMode(isLessonSelectMode);
    }, []);

    const scrollBack = useCallback(() => {
        window.scrollTo({
            top: oldScrollPositionRef.current,
            behavior: "smooth",
        });
    }, [oldScrollPositionRef]);

    const requestLesson = useCallback(() => new Promise<TeacherLessonDetail>((resolve, reject) => {
        const restoreDefaultMode = () => {
            document.body.style.overflowY = "";
            setIsLessonSelectMode(false);
        };

        document.body.style.overflowY = "hidden";

        onLessonAbortRef.current = () => {
            scrollBack();
            restoreDefaultMode();
            // Callback
            reject();
        };
        onLessonSelectRef.current = lesson => {
            restoreDefaultMode();
            setSelectedLesson(lesson);
            // Callback
            resolve(lesson);
        };

        scroll(0, 0).then(() => setIsLessonSelectMode(true));
    }), [onLessonAbortRef, onLessonSelectRef, scrollBack, setIsLessonSelectMode]);

    return {
        isLessonSelectMode,
        requestLesson,
        selectedLesson,
        scrollBack,
    };
};

export default useRequestLesson;
