import {useNetworkStatus, useSaveData as useAdaptiveSaveData} from "react-adaptive-hooks";

const useSaveData = (): boolean => {
    const {saveData} = useAdaptiveSaveData();
    const {effectiveConnectionType} = useNetworkStatus();


    return saveData || effectiveConnectionType !== "4g";
};

export default useSaveData;
