import * as storage from "./notesStorage";
import { v4 as uuidv4 } from "uuid";
import { debounce } from "./utils";
import { allNotes } from "../signals/noteSignals";

export type Note = {
    id: string;
    title: string;
    content: string;
    created: Date;
    modified: Date;
};

export function createNewNote(): Note {
    const id = uuidv4();
    const now = new Date();
    return {
        id: id,
        title: "Untitled",
        content: "",
        created: now,
        modified: now,
    };
}

function _saveNote(note: Note) {
    storage.setItem(note.id, JSON.stringify(note));
}

export const saveNote = debounce(_saveNote, 250);

export function loadNote(id: string): Note | null {
    const _data = storage.getItem(id);
    if (_data) {
        const data = JSON.parse(_data);
        return {
            id: id,
            title: data.title,
            content: data.content,
            created: new Date(data.created),
            modified: new Date(data.modified),
        };
    } else {
        return null;
    }
}

export function updateNote(note: Note, update: Partial<Note>) {
    // Compute the updated note and save.
    const updatedNote = {
        ...note,
        ...update,
        modified: new Date(),
    };
    saveNote(updatedNote);

    // Update the allNotes object if title changed (will be saved automatically by effect).
    if (update.title !== note.title) {
        allNotes.value = {
            ...allNotes.value,
            [updatedNote.id]: updatedNote.title,
        }
    }
    

    return updatedNote;
}

export function deleteNote(id: string) {
    storage.removeItem(id);
}
