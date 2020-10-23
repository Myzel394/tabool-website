import React, {memo, useCallback} from "react";
import {Subject} from "types/subject";
import Search, {ISearch} from "components/inputs/Search";
import {useTranslation} from "react-i18next";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList as List} from "react-window";
import {generatePath, useHistory} from "react-router";
import {Link} from "react-router-dom";
import SimpleListField, {itemSize} from "components/inputs/SimpleListField";

export interface ISubjectList {
    data: Subject[];

    isFetching: boolean;
    onSearch: ISearch["onSearch"];

    onSearchValueChange: ISearch["onChange"];
    searchValue: ISearch["value"];
}

const SubjectList = ({data, isFetching, onSearch, onSearchValueChange, searchValue}: ISubjectList) => {
    const {t} = useTranslation();
    const history = useHistory();
    const renderElement = useCallback(({index, style}) => {
        const props = {
            style,
        };
        const element = data[index];
        const url = generatePath("/subject/:id", {
            id: element.id,
        });

        return (
            <Link to={url}>
                <SimpleListField
                    listItemProps={{
                        button: true,
                    }}
                    primaryText={element.name}
                    secondaryText={element.shortName}
                    left={
                        <div style={{width: 10, height: 10, backgroundColor: element.userRelation.color}} />
                    }
                    {...props}
                />
            </Link>);
    }, [data]);

    return (
        <>
            <Search
                isLoading={isFetching}
                searchPlaceholder={t("Suche nach Fächern")}
                value={searchValue}
                onSearch={onSearch}
                onChange={onSearchValueChange}
            />
            <AutoSizer>
                {({width, height}) =>
                    <List
                        width={width}
                        height={height}
                        itemCount={data.length}
                        itemSize={itemSize}
                    >
                        {renderElement}
                    </List>
                }
            </AutoSizer>
        </>
    );
};

export default memo(SubjectList);
