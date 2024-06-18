import { computed, effect, signal } from "@preact/signals";
import {
    Note,
    createNewNote,
    loadNote,
    updateNote,
    saveNote,
} from "../lib/notesManager";
import { getItem, setItem, storageExport } from "../lib/notesStorage";

const selectedNote = signal<Note | null>(null);

export const selectedNoteId = computed(() => selectedNote?.value?.id);
export const selectedNoteTitle = computed(() => selectedNote?.value?.title);
export const selectedNoteContent = computed(() => selectedNote?.value?.content);
export const selectedNoteCreated = computed(() => selectedNote?.value?.created);
export const selectedNoteModified = computed(() => selectedNote?.value?.modified);


// TODO: Organize all types
type MetaNotes = {
    [key: string]: string;
}

/**
 * By default, check _meta_notes as the source of truth for all notes.
 * For compatibility, if _meta_notes is not found, create it from localStorage.
 * 
 * Populate localstorage keys that start with UUIDs into _meta_notes.
 * Do this lazily, only when getAllNotes is called.
 * 
 * Returns a map of note IDs to note titles.
 */
export function getAllNotes() : MetaNotes {
    const meta_notes_raw = getItem("_meta_notes");
    if (meta_notes_raw) {
        const meta_notes = JSON.parse(meta_notes_raw) as MetaNotes;
        return meta_notes;
    } else {
        const new_meta_notes: MetaNotes = {};
        // If we were unalbe to find _meta_notes, create it from localStorage.
        for (const key in storageExport()) {
            if (key.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)) {
                // Expect this to be a note.
                try {
                    const note = loadNote(key);
                    new_meta_notes[key] = note!.title;
                } catch (error) {
                    console.error("Error loading note:", error);
                }    
            }
        }
        // Save the note to _meta_notes.
        setItem("_meta_notes", JSON.stringify(new_meta_notes));
        return new_meta_notes;
    }
}
export const allNotes = signal(getAllNotes());

/**
 * When allNotes changes, update _meta_notes.
 */
effect(() => {
    setItem("_meta_notes", JSON.stringify(allNotes.value));
});

export function initNewNote() {
    selectedNote.value = createNewNote();
    saveCurrentNote();
    return selectedNote.value.id;
}

export function loadNoteById(id: string) {
    const _note = loadNote(id);
    if (_note) {
        console.log("Loaded note", _note);
        selectedNote.value = _note;
    } else {
        selectedNote.value = null;
    }
}

export function updateCurrentNoteTitle(title: string) {
    if (selectedNote.value) {
        selectedNote.value = updateNote(selectedNote.value, { title });
    }
}

export function updateCurrentNoteContent(content: string) {
    if (selectedNote.value) {
        selectedNote.value = updateNote(selectedNote.value, { content });
    }
}

export function saveCurrentNote() {
    if (selectedNote.value) {
        saveNote(selectedNote.value);
    }
}
