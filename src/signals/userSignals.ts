import { signal } from "@preact/signals";

export const currentNoteId = signal<string | null>(
    localStorage.getItem("currentNoteId") || null
);
