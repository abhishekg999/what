import { computed, signal } from "@preact/signals";
import {
    Note,
    createNewNote,
    loadNote,
    updateNote,
    saveNote,
} from "../lib/notesManager";

const note = signal<Note | null>(null);

export const noteId = computed(() => note?.value?.id);
export const noteTitle = computed(() => note?.value?.title);
export const noteContent = computed(() => note?.value?.content);
export const noteCreated = computed(() => note?.value?.created);
export const noteModified = computed(() => note?.value?.modified);

export function initNewNote() {
    note.value = createNewNote();
    saveCurrentNote();
    return note.value.id;
}

export function loadNoteById(id: string) {
    const _note = loadNote(id);
    if (_note) {
        note.value = _note;
    } else {
        note.value = null;
    }
}

export function updateCurrentNoteTitle(title: string) {
    if (note.value) {
        note.value = updateNote(note.value, { title });
    }
}

export function updateCurrentNoteContent(content: string) {
    if (note.value) {
        note.value = updateNote(note.value, { content });
    }
}

export function saveCurrentNote() {
    if (note.value) {
        saveNote(note.value);
    }
}
