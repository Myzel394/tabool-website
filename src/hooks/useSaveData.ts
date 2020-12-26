import {useNetworkStatus} from "react-adaptive-hooks/network";
import {useSaveData as useAdaptiveSaveData} from "react-adaptive-hooks/save-data";

const useSaveData = (): boolean => {
    const {saveData} = useAdaptiveSaveData();
    const {effectiveConnectionType} = useNetworkStatus();


    return saveData || effectiveConnectionType !== "4g";
};

export default useSaveData;
