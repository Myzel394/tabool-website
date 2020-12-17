import React, {memo} from "react";
import {useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {Grid, Link} from "@material-ui/core";
import {IFetchMaterialDownloadLinkResponse, useFetchMaterialDownloadLinkAPI} from "hooks/apis";

import {LoadingIndicator} from "../indicators";
import {PrimaryButton} from "../buttons";

export interface IGetDownloadLink {
    materialId: string;
    onClose: () => any;

    onDownload?: () => any;
}

const GetDownloadLink = ({materialId, onClose, onDownload}: IGetDownloadLink) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchDownloadLink = useFetchMaterialDownloadLinkAPI();

    const {
        data,
        isSuccess,
        isError,
        isLoading,
        refetch,
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
        },
    );

    if (isLoading) {
        return (
            <Grid container spacing={1} direction="column">
                <Grid item>
                    <LoadingIndicator />
                </Grid>
                <Grid item>
                    <Alert severity="info">
                        {t("Download-Link wird geladen")}
                    </Alert>
                </Grid>
            </Grid>
        );
    }

    if (isError || !isSuccess) {
        return (
            <>
                <Alert severity="error">
                    {t("Download-Link konnte nicht geladen werden.")}
                </Alert>
                <PrimaryButton onClick={() => refetch}>
                    {t("Erneut versuchen")}
                </PrimaryButton>
            </>
        );
    }

    return (
        <Link
            component={PrimaryButton}
            href={data?.file}
            onClick={() => {
                onClose();
                onDownload?.();
            }}
        >
            {t("Datei runterladen")}
        </Link>
    );
};

export default memo(GetDownloadLink);
