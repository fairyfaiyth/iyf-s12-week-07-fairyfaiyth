const STORAGE_PREFIX = "todoapp_";

export function save(key, data) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
}

export function load(key, defaultValue = null) {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    if (data === null) {
        return defaultValue;
    }
    try {
        return JSON.parse(data);
    } catch {
        return defaultValue;
    }
}
