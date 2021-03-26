/* eslint-disable */
export default class StorageMock {
    private store: Record<string, any>;

    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}

// @ts-ignore
global.localStorage = new StorageMock();
// @ts-ignore
global.sessionStorage = new StorageMock();
