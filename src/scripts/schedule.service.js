let generalSchedule = [];

function loadSchedule() {
    const schedule = getStorageValue(STORAGE_KEYS.scheduleKey);
    if (Array.isArray(schedule)) {
        generalSchedule = schedule;
    }
}
