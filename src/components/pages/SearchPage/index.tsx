import React, {ReactNode, useContext, useEffect, useMemo, useRef, useState} from "react";
import {Box, CircularProgress, Container, Typography} from "@material-ui/core";
import {VariableSizeList} from "react-window";
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
import _ from "lodash";
import update from "immutability-helper";
import {Alert} from "@material-ui/lab";

import {SearchBar} from "../../inputs";

import OrderingDialog, {OrderingDialogProps} from "./OrderingDialog";
import FilterDialog from "./FilterDialog";
import RowElement, {IRowElement} from "./RowElement";

const {innerHeight: initialWindowHeight} = window;

export interface ISearchPage<DataType = any, OrderingType = string> {
    data: DataType[];

    search: string;
    onSearchChange: (search: string) => any;

    fetchMore: () => any;
    containsMore: boolean;
    isFetching: boolean;
    fullAmount: number;

    sortType: "numeric" | "alphabetic" | "amount";
    sorting: "ascending" | "descending";

    orderings: OrderingDialogProps["orderings"];
    ordering: OrderingType;
    onOrderingChange: (ordering: OrderingType) => any;

    filterNode: ReactNode;

    title: string;

    isError: boolean;

    renderElement: IRowElement<DataType>["renderElement"];
    footerNode: IRowElement<DataType>["footer"];
}

const SearchPage = <DataType extends unknown = any, OrderingType = string>({
    data,
    onSearchChange,
    renderElement,
    search,
    fetchMore,
    containsMore,
    isFetching,
    fullAmount,
    sortType,
    sorting,
    orderings,
    ordering,
    onOrderingChange,
    title,
    filterNode,
    isError,
    footerNode,
}: ISearchPage<DataType, OrderingType>) => {
    const {t} = useTranslation();
    const {bottomSheetHeight} = useContext(UtilsContext);

    // Dialogs
    const [isFilteringOpen, setIsFilteringOpen] = useState<boolean>(false);
    const [isOrderingOpen, setIsOrderingOpen] = useState<boolean>(false);

    // Everything needed for windowing
    const [$list, set$List] = useState<VariableSizeList>();
    const [heights, setHeights] = useState<number[]>([]);
    const $header = useRef<any>();
    const [, headerHeight] = useElementSize($header);

    useEffect(() => {
        if ($list?.resetAfterIndex) {
            _.range(heights.length).forEach(index => $list.resetAfterIndex(index));
        }
    }, [$list, heights]);

    const renderData = () => (
        <AutoSizer>
            {({height, width}) => (
                <InfiniteLoader
                    isItemLoaded={index => !containsMore || index < (data.length)}
                    loadMoreItems={fetchMore}
                    itemCount={fullAmount}
                >
                    {({onItemsRendered, ref}) => (
                        <VariableSizeList
                            ref={reference => {
                                if (reference) {
                                    // eslint-disable-next-line no-param-reassign
                                    ref = {
                                        current: reference,
                                    };
                                    set$List(reference);
                                }
                            }}
                            itemSize={index => heights[index] ?? initialWindowHeight}
                            width={width}
                            height={height - (headerHeight ?? 0)}
                            itemCount={data.length + 1}
                            onItemsRendered={onItemsRendered}
                        >
                            {({index, style}) =>
                                <RowElement<DataType>
                                    data={data[index]}
                                    index={index}
                                    style={style}
                                    useFooter={index >= data.length}
                                    renderElement={renderElement}
                                    footer={footerNode}
                                    setHeight={height => setHeights(prevState => update(prevState, {
                                        [index]: {
                                            $set: height,
                                        },
                                    }))}
                                />
                            }
                        </VariableSizeList>
                    )}
                </InfiniteLoader>
            )}
        </AutoSizer>
    );
    const children = (() => {
        if (data.length === 0) {
            if (isFetching) {
                return (
                    <Box my={2} display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress />
                    </Box>
                );
            }
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

    return (
        <>
            <Container maxWidth="md" style={style}>
                <div ref={$header}>
                    <Box pt={2}>
                        <Typography variant="h1" component="h1">
                            {title}
                        </Typography>
                        <Box mt={2}>
                            <SearchBar
                                value={search}
                                onChange={onSearchChange}
                                {...(
                                    !isError && {
                                        onSortDialogOpen: () => setIsOrderingOpen(true),
                                        onFilterDialogOpen: () => setIsFilteringOpen(true),
                                    }
                                )}
                            />
                        </Box>
                    </Box>
                </div>
                {children}
                {isError && (
                    <Alert severity="error">
                        {t("Es gab einen Fehler. Es können keine Daten mehr geladen werden.")}
                    </Alert>
                )}
            </Container>
            <OrderingDialog
                isOpen={isOrderingOpen}
                orderings={orderings}
                value={ordering}
                onClose={() => setIsOrderingOpen(false)}
                onValueChange={onOrderingChange}
            />
            <FilterDialog
                isOpen={isFilteringOpen}
                onClose={() => setIsFilteringOpen(false)}
            >
                {filterNode}
            </FilterDialog>
        </>
    );
};

SearchPage.defaultProps = {
    sortType: "alphabetic",
    sorting: "ascending",
    isError: false,
};


export default SearchPage;
