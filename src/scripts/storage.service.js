const STORAGE_KEYS = {
    scheduleKey: 'schedule',
}

function saveToStorage(key, value) {
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
}

function getStorageValue(key) {
    let value = localStorage.getItem(key);
    try {
        value = JSON.parse(value);
        return value;
    } catch {
        return value;
    }
}
