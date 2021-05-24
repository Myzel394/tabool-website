import {useCallback, useEffect, useState} from "react";

import useAsync from "./useAsync";

export interface UseClipboardResponse {
    readContent: () => Promise<string>;

    isAvailable?: boolean;
    hasAccess?: boolean;
}

const isClipboardAvailable = (): boolean => {
    return Boolean(navigator.clipboard);
};

const checkAccessGently = async (): Promise<boolean | void> => {
    if (!isClipboardAvailable()) {
        return false;
    }

    if (!navigator.permissions) {
        return;
    }

    try {
        const status = await navigator.permissions.query({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Not supported from Typescript yet
            name: "clipboard-read",
        });

        return status.state === "granted";
    } catch (err) {
        return false;
    }
};

const useClipboard = (): UseClipboardResponse => {
    const isAvailable = isClipboardAvailable();
    const {value: hasGentleAccess} = useAsync(checkAccessGently);

    const [hasAccess, setHasAccess] = useState<boolean>(false);

    // Mirror async hasGentleAccess to hasAccess
    useEffect(() => {
        if (typeof hasGentleAccess === "boolean") {
            setHasAccess(hasGentleAccess);
        }
    }, [hasGentleAccess]);

    const readContent = useCallback(async () => {
        try {
            return navigator.clipboard.readText();
        } catch (err) {
            setHasAccess(false);
            throw err;
        }
    }, []);

    return {
        isAvailable,
        readContent,
        hasAccess: isAvailable && hasAccess,
    };
};

export default useClipboard;
