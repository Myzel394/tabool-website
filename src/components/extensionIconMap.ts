import {FaCalculator, FaFileImage, FaFilePowerpoint, FaFileWord, FiFileText, VscFilePdf} from "react-icons/all";

const extensionIconMap = {
    pdf: VscFilePdf,
    jpg: FaFileImage,
    png: FaFileImage,
    txt: FiFileText,
    doc: FaFileWord,
    docx: FaFileWord,
    ppsx: FaFilePowerpoint,
    pptx: FaFilePowerpoint,
    ggb: FaCalculator,
};

export default extensionIconMap;
