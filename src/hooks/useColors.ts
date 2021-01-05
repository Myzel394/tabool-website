import {useTheme} from "@material-ui/core";

interface IUseColors {
    inputIconColor: string;
}

const useColors = (): IUseColors => {
    const theme = useTheme();

    const inputIconColor = theme.palette.text.secondary;

    return {
        inputIconColor,
    };
};

export default useColors;
