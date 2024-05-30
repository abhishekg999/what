import * as storage from "./notesStorage";
import { v4 as uuidv4 } from "uuid";

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

export function saveNote(note: Note) {
    storage.setItem(note.id, note);
}

export function loadNote(id: string): Note | null {
    const data = storage.getItem(id);
    if (data) {
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
    const updatedNote = {
        ...note,
        ...update,
        modified: new Date(),
    };
    saveNote(updatedNote);
    return updatedNote;
}

export function deleteNote(id: string) {
    storage.removeItem(id);
}
