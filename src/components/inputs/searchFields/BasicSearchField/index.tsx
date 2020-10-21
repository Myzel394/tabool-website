import React, {useRef, useState} from "react";
import {Button, FormGroup, FormHelperText} from "@material-ui/core";
import {useElementSize, useQueryOptions, useSaveData, useWindowSize} from "hooks";
import {QueryFunction, useQuery} from "react-query";

import Modal from "./Modal";
import List from "./List";


export interface IBasicSearchField {
    title: string;
    queryKey: string;

    searchParam: string;
    searchPlaceholder: string;
    renderListElement: (element, props) => JSX.Element;

    extractData: (data) => any[];
    queryFunction: QueryFunction<any>;

    onSelect: (data) => void;

    errorMessages?: string[];
}

const BasicSearchField = ({
    title,
    queryKey,
    searchParam,
    renderListElement,
    extractData,
    queryFunction,
    searchPlaceholder,
    onSelect,
    errorMessages,
}: IBasicSearchField) => {
    const $input = useRef<any>();

    const [searchValue, setSearchValue] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const saveData = useSaveData();
    const [bodyWidth] = useElementSize($input);
    const [windowWidth, windowHeight] = useWindowSize();
    const queryOptions = useQueryOptions();
    const {isFetching, isError, data: rawData} = useQuery(
        [queryKey, {[searchParam]: search}],
        queryFunction,
        {
            ...queryOptions,
            keepPreviousData: true,
        },
    );
    const data = extractData(rawData);

    return (
        <FormGroup>
            <Modal
                isLite={saveData}
                isError={isError}
                isFetching={isFetching}
                isOpen={isOpen}
                title={title}
                searchValue={searchValue}
                searchPlaceholder={searchPlaceholder}
                onChange={value => setSearchValue(value)}
                onClose={() => setIsOpen(false)}
                onSearch={(val) => setSearch(val)}
            >
                <div ref={$input}>
                    <List
                        data={data}
                        width={(bodyWidth || windowWidth || 0)}
                        height={(windowHeight || 0) * 0.5}
                        renderListElement={(element, style) => {
                            const props = {
                                style,
                                onClick: () => {
                                    setIsOpen(false);
                                    onSelect(element);
                                },
                            };

                            return renderListElement(element, props);
                        }}
                    />
                </div>
            </Modal>
            <Button
                variant="outlined"
                color="default"
                onClick={() => setIsOpen(true)}
            >{title}</Button>
            {errorMessages &&
                <FormHelperText error>
                    {errorMessages.map(error => <span key={error}>{error}</span>)}
                </FormHelperText>
            }
        </FormGroup>
    );
};

BasicSearchField.defaultProps = {
    searchParam: "search",
    extractData: data => data?.results ?? [],
};

export default BasicSearchField;
