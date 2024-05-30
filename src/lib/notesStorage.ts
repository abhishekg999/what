import { Note } from "./notesManager";

function setItem(key: string, value: Note) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getItem(key: string): Note {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
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

function createExportUrl() {
    const data = storageExport();
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    return url;
}

function loadExportUrl(url: string) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            storageImport(data);
        });
}

export {
    setItem,
    getItem,
    removeItem,
    clear,
    storageExport,
    storageImport,
    createExportUrl,
    loadExportUrl,
};
