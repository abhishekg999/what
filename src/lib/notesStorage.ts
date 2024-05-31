function setItem(key: string, value: string) {
    localStorage.setItem(key, value);
}

function getItem(key: string): string | null {
    const value = localStorage.getItem(key);
    return value ? value : null;
}

function removeItem(key: string) {
    localStorage.removeItem(key);
}

function clear() {
    localStorage.clear();
}

/**
 * Export all currently stored data to a json object.
 */
function storageExport() {
    const data: any = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            data[key] = getItem(key);
        }
    }
    return data;
}

/**
 * Import data from a json object.
 */
function storageImport(data: any) {
    for (const key in data) {
        setItem(key, data[key]);
    }
}

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
