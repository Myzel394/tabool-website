const fallbackCopyTextToClipboard = (text: string): boolean => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let success;

    try {
        success = document.execCommand("copy");
    } catch (err) {
        success = false;
    }

    document.body.removeChild(textArea);

    return success;
};

const copyTextToClipboard = async (text: string): Promise<boolean> => {
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
    }

    try {
        await navigator.clipboard.writeText(text);

        return true;
    } catch (err) {
        return false;
    }
};

export default copyTextToClipboard;
