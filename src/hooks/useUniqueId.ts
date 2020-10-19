import {useState} from "react";
import {v4 as uuidv4} from "uuid";

const useUniqueId = (prefix = "", suffix = ""): string =>
    useState<string>(() => prefix + uuidv4() + suffix)[0];

export default useUniqueId;
