import { effect, signal } from "@preact/signals";
import { loadNoteById } from "./noteSignals";
import { setItem, getItem } from "../lib/notesStorage";
import { loadOrDefault } from "../lib/utils";

export const currentNoteId = signal<string | null>(
    getItem("currentNoteId") || null
);

export const expandedSidebar = signal<string>(loadOrDefault("Sidebar__expandedMenu", "notes"))

effect(() => {
    loadNoteById(currentNoteId.value!);
    setItem("currentNoteId", currentNoteId.value!);
})