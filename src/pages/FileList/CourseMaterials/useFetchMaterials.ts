import {useQueryOptions} from "hooks";
import {IFetchStudentMaterialResponse, useFetchStudentMaterialListAPI} from "hooks/apis";
import {useSelector} from "react-redux";
import {RootState} from "state";
import _ from "lodash";
import {useContext, useMemo} from "react";
import {InfiniteQueryObserverBaseResult, useInfiniteQuery} from "react-query";
import {AxiosError} from "axios";
import dayjs from "dayjs";
import {StudentMaterialDetail} from "types";

import FileListContext from "../FileListContext";

const emptyArray = [];

interface IUseFetchMaterials {
    amount: number;
    queryData: InfiniteQueryObserverBaseResult<IFetchStudentMaterialResponse, AxiosError>;
    materials: StudentMaterialDetail[];
}

const useFetchMaterials = (courseId: string): IUseFetchMaterials => {
    const queryOptions = useQueryOptions();
    const fetchMaterials = useFetchStudentMaterialListAPI();
    const downloadedMaterialIds = useSelector<RootState>(
        state => Object.keys(state.preferences.detailPage?.downloadedMaterials ?? {}),
        _.isEqual,
    ) as string[];
    const {
        search,
        subtractNotAvailable,
        subtractDownloaded,
    } = useContext(FileListContext);

    const params = {
        courseId,
        search,
    };

    const queryData = useInfiniteQuery<IFetchStudentMaterialResponse, AxiosError>(
        ["fetch_materials_course", params],
        ({pageParam}) => fetchMaterials({
            ...params,
            pageSize: 20,
            ordering: "publish_datetime",
        }, pageParam),
        {
            ...queryOptions,
            getNextPageParam: page => page.next,
        },
    );

    const {data} = queryData;
    const materials = data?.pages?.flatMap?.(page => page.results) ?? emptyArray;
    const {
        downloadedMaterials,
        notAvailableMaterials,
    } = useMemo(() => {
        const notAvailableMaterials = materials.filter(material => material.publishDatetime.isAfter(dayjs()));

        const downloadedMaterials = materials.filter(material => downloadedMaterialIds.includes(material.id));

        return {
            notAvailableMaterials,
            downloadedMaterials,
        };
    }, [materials, downloadedMaterialIds]);
    const amount = (() => {
        let amount = materials.length;

        if (subtractNotAvailable) {
            amount -= notAvailableMaterials.length;
        }
        if (subtractDownloaded) {
            amount -= downloadedMaterials.length;
        }

        return amount;
    })() as number;

    return {
        amount,
        queryData,
        materials,
    };
};

export default useFetchMaterials;
