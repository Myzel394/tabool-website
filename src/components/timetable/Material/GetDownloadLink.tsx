import React from "react";
import {useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {Box, CircularProgress} from "@material-ui/core";
import {IFetchMaterialDownloadLinkResponse, useFetchMaterialDownloadLinkAPI} from "hooks/apis";
import {useDispatch} from "react-redux";
import {addDownloadedMaterialsDate} from "state";

import {SimpleDialog} from "../../components";

export interface IGetDownloadLink {
    materialId: string;
    isOpen: boolean;
    onClose: () => any;

    onDownload?: () => any;
}

const GetDownloadLink = ({materialId, onClose, onDownload, isOpen}: IGetDownloadLink) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchDownloadLink = useFetchMaterialDownloadLinkAPI();
    const dispatch = useDispatch();

    const {
        isError,
        isLoading,
    } = useQuery<IFetchMaterialDownloadLinkResponse, AxiosError>(
        `fetch_material_download_link_${materialId}`,
        () => fetchDownloadLink(materialId),
        {
            ...queryOptions,
            onSuccess: materialDownloadLink => {
                onClose();
                onDownload?.();

                dispatch(addDownloadedMaterialsDate({
                    materialId,
                }));

                window.open(materialDownloadLink.file, "download");
            },
            enabled: isOpen,
        },
    );

    return (
        <SimpleDialog isOpen={isOpen} primaryButton={null} title={t("Datei runterladen")} onClose={onClose}>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                {isLoading && <CircularProgress />}
                {isError && (
                    <Alert severity="error">
                        {t("Download-Link konnte nicht geladen werden.")}
                    </Alert>
                )}
            </Box>
        </SimpleDialog>
    );
};

export default GetDownloadLink;
