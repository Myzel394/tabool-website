export const supportsWASM = (() => {
    try {
        if (typeof WebAssembly === "object" &&
            typeof WebAssembly.instantiate === "function") {
            const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            if (module instanceof WebAssembly.Module) {
                return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
            }
        }
    } catch (_event) {
        return false;
    }
    return false;
})();

export const supportsNotifications = Boolean(window.Notification);

export const supportsLocation = Boolean(navigator.geolocation);
