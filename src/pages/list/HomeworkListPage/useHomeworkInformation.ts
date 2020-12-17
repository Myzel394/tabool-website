import {useQuery} from "react-query";
import {IFetchHomeworkInformationResponse, useFetchHomeworkInformationAPI} from "hooks/apis";

const useHomeworkInformation = (): IFetchHomeworkInformationResponse | null => {
    const fetchInformation = useFetchHomeworkInformationAPI();

    const {data, isSuccess} = useQuery("homework_information", fetchInformation);

    return isSuccess && data ? data : null;
};

export default useHomeworkInformation;
