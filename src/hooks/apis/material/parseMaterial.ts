import {convertToDate} from "api";
import {MaterialDetail} from "types";

const parseMaterial = async (material: MaterialDetail): Promise<void> => {
    convertToDate(material, ["addedAt"]);
    const lesson = await import("../lesson");
    await lesson.parseLessonRelatedDetail(material.lesson);
};

export default parseMaterial;
