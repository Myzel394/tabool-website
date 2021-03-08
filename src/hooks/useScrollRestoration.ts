import {useLocation} from "react-router";
import {useEffect} from "react";

const useScrollRestoration = (): void => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
};

export default useScrollRestoration;
