/**
 * Save a key-value pair to local storage.
 * Currently just a localStorage wrapper. 
 */
function setItem(key: string, value: string) {
    localStorage.setItem(key, value);
}

/**
 * Get a value from local storage by key.
 * Currently just a localStorage wrapper.
 */
function getItem(key: string): string | null {
    const value = localStorage.getItem(key);
    return value ? value : null;
}

/**
 * Remove a key-value pair from local storage.
 * Currently just a localStorage wrapper.
 */
function removeItem(key: string) {
    localStorage.removeItem(key);
}

/**
 * Clear all data from local storage.
 * Currently just a localStorage wrapper.
 */
function clear() {
    localStorage.clear();
}

type StorageData = {
    [key: string]: string;
}

/**
 * Export all currently stored data to a object.
 * Returns an object that can be loaded with storageImport.
 */
function storageExport(): StorageData {
    const data: StorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            const value = getItem(key);
            if (value === null) {
                continue;
            }
            data[key] = value;
        }
    }
    return data;
}


/**
 * Import data (from storageExport) from a json object.
 */
function storageImport(data: StorageData) {
    for (const key in data) {
        setItem(key, data[key]);
    }
}

/**
 * Download the current storage data as a json file.
 */
function downloadExport(filename: string) {
    const jsonString = JSON.stringify(storageExport());
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.download = filename;
    link.href = url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

export {
    setItem,
    getItem,
    removeItem,
    clear,
    storageExport,
    storageImport,
    downloadExport,
};
