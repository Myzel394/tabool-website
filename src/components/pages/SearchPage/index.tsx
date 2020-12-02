import React, {CSSProperties, useContext, useEffect, useMemo, useRef, useState} from "react";
import {Box, CircularProgress, Container, Grid, IconButton, Typography} from "@material-ui/core";
import {FixedSizeList} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import {useTranslation} from "react-i18next";
import {
    FaSortAlphaDownAlt,
    FaSortAlphaUpAlt,
    FaSortAmountDown,
    FaSortAmountUp,
    FaSortNumericDownAlt,
    FaSortNumericUpAlt,
} from "react-icons/all";
import {UtilsContext} from "contexts";
import {useElementSize} from "hooks";

import {SearchBar} from "../../inputs";

import OrderingDialog, {IOrderingDialog} from "./OrderingDialog";


interface IRenderElement<DataType = any> {
    data: DataType;
    index: number;
    style: CSSProperties;
}

export interface ISearchPage<DataType = any> {
    data: DataType[];

    search: string;
    onSearchChange: (search: string) => any;

    renderElement: (data: IRenderElement<DataType>) => any;
    sampleElement: (data: IRenderElement<DataType>) => JSX.Element;

    fetchMore: () => any;
    containsMore: boolean;
    isFetching: boolean;
    fullAmount: number;

    sortType: "numeric" | "alphabetic" | "amount";
    sorting: "ascending" | "descending";

    orderings: IOrderingDialog["orderings"];
    ordering: string;
    onOrderingChange: (ordering: string) => any;
}

const SearchPage = <T extends unknown = any>({
    data,
    onSearchChange,
    renderElement,
    search,
    fetchMore,
    containsMore,
    isFetching,
    sampleElement,
    fullAmount,
    sortType,
    sorting,
    orderings,
    ordering,
    onOrderingChange,
}: ISearchPage<T>) => {
    const {t} = useTranslation();
    const {bottomSheetHeight} = useContext(UtilsContext);

    const [isOrderingOpen, setIsOrderingOpen] = useState<boolean>(false);
    const [$element, set$Element] = useState<any>();
    const [elementHeight, setElementHeight] = useState<number>();

    const $header = useRef<any>();
    const [headerWidth, headerHeight] = useElementSize($header);

    const renderSampleElement = () => (
        data.length > 0 && (
            <div ref={reference => set$Element(reference)}>
                {sampleElement({
                    data: data[0],
                    index: 0,
                    style: {},
                })}
            </div>
        )
    );
    const renderData = () => (
        <AutoSizer>
            {({height, width}) => (
                <InfiniteLoader
                    isItemLoaded={index => !containsMore || index < (data.length)}
                    loadMoreItems={fetchMore}
                    itemCount={fullAmount}
                >
                    {({onItemsRendered, ref}) => (
                        <FixedSizeList
                            ref={ref}
                            itemSize={elementHeight ?? 0}
                            width={width}
                            height={height - (headerHeight ?? 0)}
                            itemCount={data.length}
                            onItemsRendered={onItemsRendered}
                        >
                            {({index, style}) => renderElement({
                                data: data[index],
                                index,
                                style,
                            })}
                        </FixedSizeList>
                    )}
                </InfiniteLoader>
            )}
        </AutoSizer>
    );
    const children = (() => {
        if (isFetching) {
            return (
                <Box my={2} display="flex" justifyContent="center" alignItems="center">>
                    <CircularProgress />
                </Box>
            );
        }
        if (!elementHeight) {
            return renderSampleElement();
        }
        if (data.length === 0) {
            return (
                <Box my={2} display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="h4">
                        {t("Nichts gefunden")}
                    </Typography>
                </Box>
            );
        }
        return renderData();
    })();
    const style = useMemo(() => ({
        height: `calc(100vh - ${bottomSheetHeight}px)`,
    }), [bottomSheetHeight]);
    const sortIcon = (() => {
        const isAscending = sorting === "ascending";

        switch (sortType) {
            case "numeric":
                return isAscending ? <FaSortNumericUpAlt /> : <FaSortNumericDownAlt />;
            case "alphabetic":
                return isAscending ? <FaSortAlphaUpAlt /> : <FaSortAlphaDownAlt />;
            case "amount":
                return isAscending ? <FaSortAmountUp /> : <FaSortAmountDown />;
        }
    })();

    useEffect(() => {
        if ($element) {
            setElementHeight($element.clientHeight);
        }
    }, [$element, data]);

    return (
        <>
            <Container maxWidth="sm" style={style}>
                <div ref={$header}>
                    <Grid container direction="row">
                        <Grid item>
                            <Typography variant="h3" component="h1">
                            Titel
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton color="default" onClick={() => setIsOrderingOpen(true)}>
                                {sortIcon}
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Box mt={2}>
                        <SearchBar value={search} onChange={onSearchChange} />
                    </Box>
                </div>
                {children}
            </Container>
            <OrderingDialog
                isOpen={isOrderingOpen}
                orderings={orderings}
                value={ordering}
                onClose={() => setIsOrderingOpen(false)}
                onValueChange={onOrderingChange}
            />
        </>
    );
};

SearchPage.defaultProps = {
    sortType: "alphabetic",
    sorting: "ascending",
};


export default SearchPage;
