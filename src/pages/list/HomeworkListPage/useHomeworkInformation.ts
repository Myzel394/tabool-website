import {useQuery} from "react-query";
import {useFetchHomeworkInformationAPI} from "hooks";
import {IFetchHomeworkInformationResponse} from "hooks/apis/fetch/homework/useFetchHomeworkInformationAPI";

const useHomeworkInformation = (): IFetchHomeworkInformationResponse | null => {
    const fetchInformation = useFetchHomeworkInformationAPI();

    const {data, isSuccess} = useQuery("homework_information", fetchInformation);

    return isSuccess && data ? data : null;
};

export default useHomeworkInformation;
