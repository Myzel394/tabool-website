import React from "react";
import {Subject} from "types";
import {Dayjs} from "dayjs";

interface FilterData {
    subject?: Subject;
    ignore?: boolean;
    completed?: boolean;
    dueDateStart?: Dayjs | null;
    dueDateEnd?: Dayjs | null;
}

const HomeworkListPage = () => {
    return null;

    /*
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchHomework = useFetchHomeworkListAPI();
    const {addError} = useSnackbar();
    const homeworkInformation = useHomeworkInformation();

    const [filter, setFilter] = useState<FilterData>({
        dueDateStart: null,
        dueDateEnd: null,
    });
    const [ordering, setOrdering] = useState<OrderingTypes>("due_date");
    const [search, setSearch] = useState<string>("");
    const [homeworks, setHomeworks] = useState<HomeworkApprox[]>([]);

    const debouncedSearch = useDebouncedValue<string>(search);
    const {
        data: rawDataGroups,
        isLoading,
        fetchNextPage,
        isError,
        hasNextPage,
    } = useInfiniteQuery<IFetchHomeworkListResponse, AxiosError>(
        `fetch_homework_list_${debouncedSearch}`,
        (context) => fetchHomework({
            ordering,
            subjectId: filter?.subject?.id,
            completed: filter?.completed,
            ignore: filter?.ignore,
            dueDateMin: filter?.dueDateStart ? getISODatetime(setBeginTime(filter.dueDateStart)) : undefined,
            dueDateMax: filter?.dueDateEnd ? getISODatetime(setEndTime(filter.dueDateEnd)) : undefined,
            search: debouncedSearch,
        }, context.pageParam),
        {
            ...queryOptions,
            onSuccess: data => setHomeworks(data.pages.reduce((previousValue: any, currentValue) => [
                ...previousValue,
                ...currentValue.results,
            ], [])),
            getNextPageParam: lastPage => {
                return parseInt(lastPage.next, 10) ?? false;
            },
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorLoading),
            refetchOnWindowFocus: false,
        },
    );

    const renderElement = ({data}) => {
        return (
            <Box
                py={1}
            >
                <Homework
                    subject={data.subject}
                    information={data.truncatedInformation}
                    id={data.id}
                    creationDate={data.createdAt}
                />
            </Box>
        );
    };

    return (
        <SearchPage<HomeworkApprox, OrderingTypes>
            orderings={[
                {
                    name: t("Fälligkeitsdatum"),
                    value: "due_date",
                },
            ]}
            title={t("Hausaufgaben")}
            ordering={ordering}
            fullAmount={rawDataGroups?.[0]?.count ?? 0}
            isFetching={isLoading}
            isError={isError}
            containsMore={hasNextPage ?? false}
            fetchMore={fetchNextPage}
            search={search}
            data={homeworks}
            renderElement={renderElement}
            filterNode={(
                <form>
                    <Grid container spacing={4} direction="column" alignItems="flex-start">
                        <Grid item>
                            <FormElement
                                form={
                                    <SubjectField
                                        label={t("Fach")}
                                        selectedValue={filter.subject}
                                        listItemSize={50}
                                        onChange={value => setFilter(prevState => update(prevState, {
                                            subject: {
                                                $set: value,
                                            },
                                        }))}
                                    />
                                }
                                title={t("Fach")}
                                icon={<FaChalkboardTeacher />}
                            />
                        </Grid>
                        <Grid item>
                            <FormLabel>
                                {t("Fälligkeitsdatum")}
                            </FormLabel>
                            <Grid container direction="column" alignItems="center">
                                <Grid item>
                                    <Typography color="textSecondary">
                                        {t("Von")}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <DatePicker
                                        value={filter?.dueDateStart}
                                        minDate={homeworkInformation?.dueDateMin}
                                        maxDate={homeworkInformation?.dueDateMax}
                                        onChange={date => setFilter(prevState => update(prevState, {
                                            dueDateStart: {
                                                $set: date,
                                            },
                                        }))}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography color="textSecondary">
                                        {t("Bis")}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <DatePicker
                                        value={filter?.dueDateEnd}
                                        minDate={homeworkInformation?.dueDateMin}
                                        maxDate={homeworkInformation?.dueDateMax}
                                        onChange={date => setFilter(prevState => update(prevState, {
                                            dueDateEnd: {
                                                $set: date,
                                            },
                                        }))}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <FormLabel>
                                {t("Persönlich")}
                            </FormLabel>
                            <Box mt={1}>
                                <Grid container spacing={1} direction="row">
                                    <FormControlLabel
                                        label={t("Erledigt")}
                                        labelPlacement="start"
                                        disabled={homeworkInformation?.completedCount === 0}
                                        control={
                                            <Box ml={1}>
                                                <ToggleButton
                                                    selected={filter.completed}
                                                    disabled={homeworkInformation?.completedCount === 0}
                                                    onClick={() => setFilter(prevState => update(prevState, {
                                                        completed: {
                                                            $apply: value => !value,
                                                        },
                                                    }))}
                                                >
                                                    <MdCheck />
                                                </ToggleButton>
                                            </Box>
                                        }
                                    />
                                    <FormControlLabel
                                        label={t("Ignorieren")}
                                        labelPlacement="start"
                                        disabled={homeworkInformation?.ignoreCount === 0}
                                        control={
                                            <Box ml={1}>
                                                <ToggleButton
                                                    selected={filter.ignore}
                                                    disabled={homeworkInformation?.ignoreCount === 0}
                                                    onClick={() => setFilter(prevState => update(prevState, {
                                                        ignore: {
                                                            $apply: value => !value,
                                                        },
                                                    }))}
                                                >
                                                    <MdCheck />
                                                </ToggleButton>
                                            </Box>
                                        }
                                    />
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            )}
            footerNode={
                <Box py={3} textAlign="center">
                    <Link
                        component={SecondaryButton}
                        endIcon={<MdAdd />}
                        href={buildPath("/add/homework/")}
                    >
                        {t("Hausaufgabe hinzufügen")}
                    </Link>
                </Box>
            }
            onOrderingChange={setOrdering}
            onSearchChange={setSearch}
        />
    );*/
};

export default HomeworkListPage;
