import React, {useEffect, useLayoutEffect} from "react";
import {useQueryOptions, useUserPreferences} from "hooks";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {Box, CircularProgress} from "@material-ui/core";
import {IFetchMaterialDownloadLinkResponse, useFetchMaterialDownloadLinkAPI} from "hooks/apis";

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
    const {update} = useUserPreferences();

    const {
        data,
        isLoading,
    } = useQuery<IFetchMaterialDownloadLinkResponse, AxiosError>(
        `fetch_material_download_link_${materialId}`,
        () => fetchDownloadLink(materialId),
        {
            ...queryOptions,
            onSuccess: materialDownloadLink => {
                window.open(materialDownloadLink.file, "download");
                onClose();
                onDownload?.();
            },
            enabled: isOpen,
        },
    );

    const downloadLink = data?.file;

    // If download link available, download file
    useLayoutEffect(() => {
        if (downloadLink) {
            onClose();
            window.open(downloadLink, "download");
        }
    }, [downloadLink, onClose]);

    useEffect(() => {
        if (downloadLink && isOpen) {
            update.detailPage.addDownloadedMaterialsDate(materialId);
            onClose();
        }
    }, [downloadLink, isOpen, update.detailPage, onClose, materialId]);

    return (
        <SimpleDialog isOpen={isOpen} primaryButton={null} title={t("Datei runterladen")} onClose={onClose}>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                {isLoading && <CircularProgress />}
                {(!downloadLink && isLoading) && (
                    <Alert severity="error">
                        {t("Download-Link konnte nicht geladen werden.")}
                    </Alert>
                )}
            </Box>
        </SimpleDialog>
    );
};

export default GetDownloadLink;
